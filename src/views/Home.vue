<template>
  <v-container fluid class="ma-0 pa-0 h-100">
    <v-row class="ma-0 pa-0 h-100">
      <v-col class="ma-0 px-3 py-2 h-100" cols="2">

      </v-col>
      <v-col class="ma-0 pa-0 h-100" lg="10">
        <WebMap />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import WebMap from '@/components/WebMap.vue'

</script>
