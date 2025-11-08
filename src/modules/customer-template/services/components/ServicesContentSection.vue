<template>
  <div class="section-6 gray-bg">
    <div class="base-container-18 w-container">
      <div data-w-id="fd53059c-ec5b-dfc8-8446-29215e4a7bbb" style="" class="blog-template-wrapper">
        <div class="rich-text-style w-richtext">
          <h3 class="heading-40">
            <EditableText page-name="services" component-name="content" element-id="heading-1"
              default-value="Creating a website by yourself, takes time and money" tag="span" :rows="2" />
          </h3>
          <p>
            <EditableText page-name="services" component-name="content" element-id="paragraph-1"
              default-value="There's a learning curve when creating a website; if you're not technically savvy, you'll have to learn how to use a website builder or, worse yet, code—it can be overwhelming., and it takes time. You could also hire someone, but that's not what you want when you're just starting out. Also, you will have to take in consideration security, speed and performance if you create it by yourself."
              tag="span" :rows="4" />
          </p>
          <h3>
            <strong class="bold-text-4">
              <EditableText page-name="services" component-name="content" element-id="heading-2"
                default-value="Creating a website by yourself, leads to Paralysis by analysis" tag="span" :rows="2" />
            </strong>
          </h3>
          <p>
            <EditableText page-name="services" component-name="content" element-id="paragraph-2"
              default-value="A convincing website is user-centric. It answers the visitor's silent question: 'What's in it for me?' (WIIFM). Every element should be designed to build trust and show value for them. If you create a website by yourself you may face a lot of issues like 'Paralysis by Analysis': Endlessly researching the 'perfect' platform, template, or color scheme without ever starting."
              tag="span" :rows="4" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
</script>

<style scoped></style>
