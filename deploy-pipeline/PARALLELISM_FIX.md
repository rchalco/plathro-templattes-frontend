# Solución al error de Paralelismo en Azure DevOps

## Error

```
No hosted parallelism has been purchased or granted
```

## Soluciones disponibles

### ⭐ Opción 1: Solicitar acceso gratuito (Recomendada)

1. **Completa el formulario**: https://aka.ms/azpipelines-parallelism-request
2. **Información requerida**:
   - Nombre de tu organización de Azure DevOps
   - Razón del uso: "Deploy Vue.js SPA to AWS S3"
   - Proyecto público o privado
3. **Tiempo de respuesta**: 2-3 días hábiles
4. **Beneficio**: 1 agente gratuito, 1,800 minutos/mes

---

### 🖥️ Opción 2: Usar Self-hosted Agent (Inmediata)

Usa tu propia máquina como agente de build. **No requiere aprobación**.

#### Paso 1: Descargar e instalar el agente

**En Windows (PowerShell como Administrador):**

```powershell
# Crear directorio para el agente
mkdir C:\azagent
cd C:\azagent

# Descargar el agente (verifica la última versión en Azure DevOps)
Invoke-WebRequest -Uri "https://vstsagentpackage.azureedge.net/agent/3.236.1/vsts-agent-win-x64-3.236.1.zip" -OutFile "agent.zip"

# Extraer
Expand-Archive -Path "agent.zip" -DestinationPath .

# Configurar el agente
.\config.cmd
```

#### Paso 2: Configurar el agente

Cuando ejecutes `.\config.cmd`, te pedirá:

```
Server URL: https://dev.azure.com/{tu-organizacion}
Authentication type: PAT (Personal Access Token)
Personal access token: [Genera uno en Azure DevOps]
Agent pool: Default (o crea uno nuevo)
Agent name: MiAgenteLocal (o el nombre que prefieras)
Work folder: _work (default)
Run as service: Y (sí)
```

#### Paso 3: Generar Personal Access Token (PAT)

1. Ve a Azure DevOps > **User Settings** (ícono arriba derecha) > **Personal Access Tokens**
2. Click **+ New Token**
3. Configura:
   - **Name**: `Self-hosted Agent`
   - **Expiration**: 90 días (o custom)
   - **Scopes**:
     - ✅ **Agent Pools (Read & manage)**
     - ✅ **Deployment Groups (Read & manage)**
4. Click **Create** y **copia el token** (solo lo verás una vez)

#### Paso 4: Iniciar el agente como servicio

```powershell
# Ya configurado como servicio, iniciará automáticamente
# Para iniciarlo manualmente:
.\run.cmd

# O como servicio:
Start-Service vstsagent.*
```

#### Paso 5: Usar el archivo YAML para self-hosted

Usa el archivo `azure-pipelines-selfhosted.yml` que creé:

```yaml
pool:
  name: 'Default' # El nombre del pool donde registraste tu agente
```

---

### 💳 Opción 3: Comprar paralelismo (Pago)

Si necesitas múltiples agentes o minutos ilimitados:

1. Ve a **Organization Settings** > **Billing** > **Parallel jobs**
2. Compra agentes adicionales:
   - **Microsoft-hosted**: $40/mes por agente adicional
   - **Self-hosted**: $15/mes por agente adicional

---

## ⚡ Comparación rápida

| Opción                 | Tiempo    | Costo   | Pros                     | Contras                         |
| ---------------------- | --------- | ------- | ------------------------ | ------------------------------- |
| **Solicitar gratuito** | 2-3 días  | Gratis  | Fácil, sin mantenimiento | Espera aprobación               |
| **Self-hosted**        | 30 min    | Gratis  | Inmediato, control total | Tu máquina debe estar encendida |
| **Comprar**            | Inmediato | $40/mes | Profesional, confiable   | Costo mensual                   |

---

## 🔧 Recomendación

1. **Corto plazo**: Usa self-hosted agent mientras esperas
2. **Mediano plazo**: Solicita el acceso gratuito (1,800 min/mes es suficiente)
3. **Largo plazo/Producción**: Considera comprar si necesitas más capacidad

---

## 📝 Recursos adicionales

- [Documentación oficial de Self-hosted Agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops)
- [Crear Personal Access Token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)
- [Precios de Azure Pipelines](https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/)
