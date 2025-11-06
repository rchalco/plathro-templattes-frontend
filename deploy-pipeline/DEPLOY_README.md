# Configuración del Pipeline de Azure DevOps para despliegue a S3

## Pasos de configuración

### 1. Configurar Variables Secretas en Azure DevOps

Ve a **Pipelines** > Tu pipeline > **Edit** > **Variables** y agrega:

| Variable                     | Valor                       | Secreto |
| ---------------------------- | --------------------------- | ------- |
| `AWS_ACCESS_KEY_ID`          | Tu Access Key de AWS        | ✅ Sí   |
| `AWS_SECRET_ACCESS_KEY`      | Tu Secret Key de AWS        | ✅ Sí   |
| `AWS_REGION`                 | `us-east-1` (tu región)     | No      |
| `S3_BUCKET_NAME`             | `tu-bucket-name`            | No      |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1234567890ABC` (opcional) | No      |

**IMPORTANTE**: Marca `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` como **secretas** para proteger tus credenciales.

### 2. Crear credenciales IAM en AWS

1. Ve a AWS Console > **IAM** > **Users** > **Create user**
2. Nombre: `azure-devops-deploy` (o el que prefieras)
3. Marca: **Access key - Programmatic access**
4. Adjunta la política con los permisos del paso 3
5. Guarda el **Access Key ID** y **Secret Access Key**

### 3. Permisos IAM necesarios en AWS

Tu usuario/rol de AWS necesita estos permisos mínimos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::tu-bucket-name", "arn:aws:s3:::tu-bucket-name/*"]
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "*"
    }
  ]
}
```

### 4. Configurar el bucket S3 para hosting web

```bash
# Habilitar hosting estático
aws s3 website s3://tu-bucket-name/ --index-document index.html --error-document index.html

# Configurar bucket policy (público)
aws s3api put-bucket-policy --bucket tu-bucket-name --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::tu-bucket-name/*"
  }]
}'
```

### 5. Características del pipeline

✅ **Build automático** al hacer push a `main` o `develop`
✅ **Instalación de pnpm** y dependencias
✅ **Build optimizado** con Vite
✅ **Sync incremental** a S3 (solo sube archivos modificados)
✅ **Cache-Control optimizado**:

- Assets (JS, CSS, imágenes): cache 1 año
- index.html: sin cache (para revalidación)
  ✅ **Invalidación de CloudFront** (opcional, si usas CDN)
  ✅ **Artifacts** guardados para rollback

### 6. Uso avanzado

#### Pipeline multi-entorno

Modifica el pipeline para staging/production:

```yaml
parameters:
  - name: environment
    displayName: 'Environment'
    type: string
    default: 'staging'
    values:
      - staging
      - production

variables:
  - ${{ if eq(parameters.environment, 'production') }}:
      - name: S3_BUCKET_NAME
        value: 'mi-app-production'
  - ${{ if eq(parameters.environment, 'staging') }}:
      - name: S3_BUCKET_NAME
        value: 'mi-app-staging'
```

#### Notificaciones

Agrega al final del pipeline:

```yaml
- task: SendEmail@1
  condition: failed()
  inputs:
    To: 'tu-equipo@empresa.com'
    Subject: 'Pipeline failed: $(Build.DefinitionName)'
    Body: 'Build $(Build.BuildNumber) failed'
```

### 7. Comandos útiles

```bash
# Ver logs del pipeline
az pipelines runs show --id <run-id>

# Listar archivos en S3
aws s3 ls s3://tu-bucket-name/ --recursive

# Sincronizar manualmente
aws s3 sync ./dist s3://tu-bucket-name --delete
```

## Troubleshooting

**Error: "Access Denied"**

- Verifica las credenciales AWS
- Revisa permisos IAM
- Confirma que el bucket existe

**Imágenes no se ven**

- Verifica que el script `postbuild` se ejecutó
- Revisa que las rutas usen `new URL()` en los arrays
- Inspecciona la carpeta `dist/assets/images`

**Cache no se invalida**

- Verifica que `CLOUDFRONT_DISTRIBUTION_ID` esté configurado
- Espera 5-10 minutos para propagación
- Prueba invalidación manual: `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`
