<template>
  <div class="relative bg-red-500 w-full h-full">
    <NuxtStateMonitor v-model:custom-data="additional"/>

    <NuxtStateMonitorDropdownViewer/>
  </div>
</template>

<script setup>
import {useState} from "#app"

const string = useState('string', () => '123')
const number = useState('number', () => 456)
const boolean = useState('boolean', () => true)
useState('object', () => {
  return {string: string.value, number: number.value, boolean: boolean.value}
})

const additional = {
  additionalString: "Hello world",
  additionalNumber: 45160,
  additionalBoolean: false,
  additionalObject: {
    glossary: {
      title: "example glossary",
      GlossDiv: {
        title: "S",
        GlossList: {
          GlossEntry: {
            ID: "SGML",
            SortAs: "SGML",
            GlossTerm: "Standard Generalized Markup Language",
            Acronym: "SGML",
            Abbrev: "ISO 8879:1986",
            GlossDef: {
              para: "A meta-markup language, used to create markup languages such as DocBook.",
              GlossSeeAlso: ["GML", "XML"]
            },
            GlossSee: "markup"
          }
        }
      }
    }
  }
}
</script>
