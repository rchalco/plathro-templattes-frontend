<template>
  <section class="home-section-testimony">
    <div class="home-testimony-container">
      <div class="home-testimony-wrapper">
        <div class="home-testimony-content">
          <div class="home-testimony-component-2">
            <!-- Left Content -->
            <div class="testimony-left-2">
              <EditableText page-name="home" component-name="testimony" element-id="title"
                default-value="We value our clients." tag="h2" class-name="heading-38" :rows="1" />

              <div class="padding-bottom padding-small"></div>

              <EditableText page-name="home" component-name="testimony" element-id="description"
                default-value="Platheo utilizes end-to-end encryption to encrypt data plus constrained role-based access control (RBAC) per time, location and job role per module enhancing the security. This means you are the data controller and we cannot access to personal information."
                tag="p" class-name="paragraph-14" :rows="4" />

              <div class="padding-bottom padding-medium"></div>

              <router-link to="/sign-in" class="button-testimonio w-button">
                CAD&nbsp;200.00 Gift Card
              </router-link>
              <img sizes="129.8203125px" height="82" alt="" src="/src/assets/images/gdpr-ccpa.png" loading="lazy"
                class="image-88">
            </div>

            <!-- Right Content - Testimonials -->
            <div class="testimony-right">
              <div v-for="(testimony, index) in testimonials" :key="index" class="testimony-item"
                :class="`_${index + 1}`">
                <EditableText :page-name="'home'" :component-name="'testimony'"
                  :element-id="`testimony-quote-${index + 1}`" :default-value="testimony.quote" tag="p"
                  :class-name="`testimony-text-${index + 1} text-weight-bold`" :rows="3" />

                <div :class="testimony.wrapperClass">
                  <div class="testimony-image-wrapper">
                    <EditableImage :page-name="'home'" :component-name="'testimony'"
                      :element-id="`testimony-photo-${index + 1}`" :default-value="testimony.photo"
                      :alt="`${testimony.name} photo`" :img-class="testimony.imgClass" />
                  </div>

                  <div :class="testimony.detailsClass">
                    <div :class="testimony.nameClass">
                      <EditableText :page-name="'home'" :component-name="'testimony'"
                        :element-id="`testimony-name-${index + 1}`" :default-value="testimony.name" tag="span"
                        :rows="1" />
                    </div>
                    <div class="testimony-client-line"></div>
                    <div :class="testimony.companyClass">
                      <EditableText :page-name="'home'" :component-name="'testimony'"
                        :element-id="`testimony-company-${index + 1}`" :default-value="testimony.company" tag="span"
                        :rows="1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import EditableImage from '@/components/EditableImage.vue'

interface Testimony {
  quote: string
  name: string
  company: string
  photo: string
  wrapperClass: string
  detailsClass: string
  nameClass: string
  companyClass: string
  imgClass: string
}

// Use new URL() to ensure Vite processes and bundles these images
const testimonials: Testimony[] = [
  {
    quote: '"Thanks to the great services and tools plus ongoing guidance, our profit improved by 35% in just one season — with less personnel and simple processes."',
    name: 'Daniel Kwame',
    company: 'CEO at Fingers',
    photo: new URL('../../../../assets/images/jahanzeb-ahsan-YXZMEgBNjCA-unsplash_1jahanzeb-ahsan-YXZMEgBNjCA-unsplash.webp', import.meta.url).href,
    wrapperClass: 'testimony-client-wrapper-1',
    detailsClass: 'testimony-client-details-1-15',
    nameClass: 'text-name-1',
    companyClass: 'text-company-1',
    imgClass: 'person-image-1'
  },
  {
    quote: '"Their team brings not only expertise but real care for the process and the sellers."',
    name: 'Lisa Rhouther',
    company: 'CEO at Lisana\'s',
    photo: new URL('../../../../assets/images/cc6be39e83c230aba39ce05e6dc5ab4b_1cc6be39e83c230aba39ce05e6dc5ab4b.webp', import.meta.url).href,
    wrapperClass: 'testimony-client-wrapper-2',
    detailsClass: 'testimony-client-details-2',
    nameClass: 'text-name-2',
    companyClass: 'text-company-2',
    imgClass: 'person-image-2'
  },
  {
    quote: '"Their consistency, quality, and eco-friendly practices are unmatched in the industry."',
    name: 'Fred Anderson',
    company: 'CEO of Client Line',
    photo: new URL('../../../../assets/images/ffaab380274c77955b489b4a99200855_1ffaab380274c77955b489b4a99200855.webp', import.meta.url).href,
    wrapperClass: 'testimony-client-wrapper-1',
    detailsClass: 'testimony-client-details-1-15',
    nameClass: 'text-name-3',
    companyClass: 'text-company-3',
    imgClass: 'person-image-3'
  },
  {
    quote: '"We\'ve seen measurable improvements in both crop quality and operational efficiency since partnering with them."',
    name: 'Rebecca Truj',
    company: 'CEO of Medieta',
    photo: new URL('../../../../assets/images/8351356b6266e418d38c01078bbc5cf1_18351356b6266e418d38c01078bbc5cf1.webp', import.meta.url).href,
    wrapperClass: 'testimony-client-wrapper-1',
    detailsClass: 'testimony-client-details-1-15',
    nameClass: 'text-name-4',
    companyClass: 'text-company-4',
    imgClass: 'person-image-4'
  },
  {
    quote: '"Working with Platheo has transformed the way we operate. Their sustainable approach and reliable delivery have made them an essential part of our supply chain."',
    name: 'Mark Linberg',
    company: 'CEO of Artana',
    photo: new URL('../../../../assets/images/0107498c7d71858feb093541b0969658_10107498c7d71858feb093541b0969658.webp', import.meta.url).href,
    wrapperClass: 'testimony-client-wrapper-1',
    detailsClass: 'testimony-client-details-1-15',
    nameClass: 'text-name-5',
    companyClass: 'text-company-5',
    imgClass: 'person-image-5'
  }
]
</script>

<style scoped>
/* Los estilos se heredan del CSS global */
</style>
