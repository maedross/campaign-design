<template>
  <main>
    <div v-if="gameData">
      <h1>{{ gameData.name }}</h1>
      <ol>
        <div v-for="(campaign, index) in gameData.campaigns" :key="index" class="row-container">
          <div>
            <button @click="toggleCampaign(index)" class="expand-collapse-button">
              {{ isCampaignExpanded(index) ? '-' : '+' }}
            </button>
          </div>
          <li class="campaign">
            {{ campaign.name }}
            <ol v-if="isCampaignExpanded(index)">
              <div v-for="(scenario, sInd) in campaign.scenarios" :key="sInd" class="row-container">
                <button @click="toggleScenario(index + '-' + sInd)" class="expand-collapse-button">
                  {{ isScenarioExpanded(index + '-' + sInd) ? '-' : '+' }}
                </button>
                <li>
                  <div class="row-container">
                    {{ scenario.name }}
                    <div v-if="isScenarioExpanded(index + '-' + sInd)">
                      <table v-for="(objective, oInd) in scenario.objectives" :key="oInd">
                        <tbody>
                          <tr class="text">
                            <td>Text</td>
                            <td>{{ objective.text }}</td>
                          </tr>
                          <tr class="identity">
                            <td>Identity</td>
                            <td>{{ objective.identity }}</td>
                          </tr>
                          <tr class="priority">
                            <td>Priority</td>
                            <td>{{ objective.priority }}</td>
                          </tr>
                          <tr class="success-effects">
                            <td>Success Effects</td>
                            <td>
                              <ul>
                                <li v-for="(sEffect, sEInd) in objective.successEffects" :key="sEInd">
                                  {{ sEffect }}
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr class="failure-effects">
                            <td>Failure Effects</td>
                            <td>
                              <ul>
                                <li v-for="(fEffect, fEInd) in objective.failureEffects" :key="fEInd">
                                  {{ fEffect }}
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr class="time">
                            <td>Time</td>
                            <td>{{ objective.time }}</td>
                          </tr>
                          <tr class="conditions">
                            <td>Conditions</td>
                            <td>
                              <ul>
                                <li
                                  v-for="(condition, condInd) in objective.conditions"
                                  :key="condInd"
                                >
                                  {{ condition }}
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr class="possible">
                            <td>Possible</td>
                            <td v-if="objective.possible == true">Yes</td>
                            <td v-else>No</td>
                          </tr>
                          <tr v-if="objective.notes" class="notes">
                            <td>Additional Notes</td>
                            <td>{{ objective.notes }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </li>
              </div>
            </ol>
          </li>
        </div>
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
        successEffects: string[]
        failureEffects: string[]
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
const expandedCampaigns = reactive<Record<string, boolean>>({})

const toggleScenario = (key: string) => {
  expandedScenarios[key] = !expandedScenarios[key]
}

const toggleCampaign = (key: number) => {
  expandedCampaigns[key] = !expandedCampaigns[key]
}

const isScenarioExpanded = (key: string) => {
  return expandedScenarios[key]
}

const isCampaignExpanded = (key: number) => {
  return expandedCampaigns[key]
}

onMounted(async () => {
  try {
    const data = await import(`../data/${gameId}.json`)
    gameData.value = data

    gameData.value?.campaigns.forEach((campaign, campaignIndex) => {
      expandedCampaigns[campaignIndex] = true
    })

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

td {
  border: 1px solid black;
}
.row-container {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.expand-collapse-button {
  position: absolute;
  left: -40px;
  top: 3px;
  margin: 0;
  width: auto;
}
</style>
