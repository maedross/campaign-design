<template>
  <main>
    <h1>Game ID is {{ gameId }}</h1>
    <div v-if="gameData">
      <h1>{{ gameData.name }}</h1>
      <ol>
        <li v-for="(campaign, index) in gameData.campaigns" :key="index">
          {{ campaign.name }}
          <ol>
            <li v-for="(scenario, sInd) in campaign.scenarios" :key="sInd" class="row-container">
              <div>
                <button @click="toggleScenario(index + '-' + sInd)">
                  {{ isScenarioExpanded(index + '-' + sInd) ? '-' : '+' }}
                </button>
              </div>
              {{ scenario.name }}

              <div v-if="isScenarioExpanded(index + '-' + sInd)">
                <table v-for="(objective, oInd) in scenario.objectives" :key="oInd">
                  <tbody>
                    <tr>
                      <td>Text</td>
                      <td>{{ objective.text }}</td>
                    </tr>
                    <tr>
                      <td>Identity</td>
                      <td>{{ objective.identity }}</td>
                    </tr>
                    <tr>
                      <td>Effects</td>
                      <td>
                        <ul>
                          <li v-for="(effect, eInd) in objective.effects" :key="eInd">
                            {{ effect }}
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td>Time</td>
                      <td>{{ objective.time }}</td>
                    </tr>
                    <tr>
                      <td>Conditions</td>
                      <td>
                        <ul>
                          <li v-for="(condition, condInd) in objective.conditions" :key="condInd">
                            {{ condition }}
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Possible</td>
                      <td v-if="objective.possible == true">Yes</td>
                      <td v-else>No</td>
                    </tr>
                    <tr v-if="objective.notes">
                      <td>Additional Notes</td>
                      <td>{{ objective.notes }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <p v-else>Loading game data...</p>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

interface GameData {
  name: string
  campaigns: {
    name: string
    scenarios: {
      name: string
      objectives: {
        text: string
        identity: string
        priority: string
        effects: string[]
        time: string
        conditions: string[]
        possible: boolean
        notes: string
      }[]
    }[]
  }[]
}

const route = useRoute()
const gameId = route.params.gameId as string
const gameData = ref<GameData | null>(null)

const expandedScenarios = reactive<Record<string, boolean>>({})

const toggleScenario = (key: string) => {
  expandedScenarios[key] = !expandedScenarios[key]
}

const isScenarioExpanded = (key: string) => {
  return expandedScenarios[key]
}

onMounted(async () => {
  try {
    const data = await import(`../data/${gameId}.json`)
    gameData.value = data

    gameData.value?.campaigns.forEach((campaign, campaignIndex) => {
      campaign.scenarios.forEach((_, scenarioIndex) => {
        const key = `${campaignIndex}-${scenarioIndex}`
        expandedScenarios[key] = true
      })
    })
  } catch (error) {
    console.error(`Failed to load game data for ID: ${gameId}`, error)
    gameData.value = null
  }
})
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

table tr:nth-child(1) {
  background-color: #ffcccc;
}

table tr:nth-child(2) {
  background-color: #ccffcc;
}

table tr:nth-child(3) {
  background-color: #cce5ff;
}

table tr:nth-child(4) {
  background-color: #ffffcc;
}

table tr:nth-child(5) {
  background-color: #e6ccff;
}

table tr:nth-child(6) {
  background-color: #ffdab9;
}

table tr:nth-child(7) {
  background-color: #ccffff;
}

table tr:nth-child(8) {
  background-color: #f2f2f2;
}

tr td:nth-child(1) {
  width: 20%;
}

tr td:nth-child(2) {
  width: 80%;
}

td {
  border: 1px solid black;
}
.row-container {
  display: flex;
  align-items: flex-start;
}
</style>
