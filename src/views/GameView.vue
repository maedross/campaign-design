<template>
  <h1>Game ID is {{ gameId }}</h1>
  <div v-if="gameData">
    <h1>{{ gameData.name }}</h1>
    <ol>
      <li v-for="(campaign, index) in gameData.campaigns" :key="index">
        {{ campaign.name }}
        <ol>
          <li v-for="(scenario, sInd) in campaign.scenarios" :key="sInd">
            {{ scenario.name }}
            <ol>
              <li v-for="(objective, oInd) in scenario.objectives" :key="oInd"><ul>
                <li v-for="(trait, tInd) in objective" :key="tInd">{{ trait }}</li>
              </ul></li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </div>
  <p v-else>Loading game data...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface GameData {
  name: string
  campaigns: {
    name: string
    scenarios: {
      name: string
      objectives: { text: string; identity: string; priority: string; effects: string }[]
    }[]
  }[]
}

const route = useRoute()
const gameId = route.params.gameId as string
const gameData = ref<GameData | null>(null)

onMounted(async () => {
  try {
    const data = await import(`../data/${gameId}.json`)
    gameData.value = data
  } catch (error) {
    console.error(`Failed to load game data for ID: ${gameId}`, error)
    gameData.value = null
  }
})
</script>

<style></style>
