<script setup lang="ts"></script>

<template>
  <main>
    <h1>Objectives Model</h1>
    <p>
      Welcome! This is a model that breaks down all of the aspects that make up a player objective.
      I developed this model with the Real-Time Strategy (RTS) genre in mind, but by no means is it
      limited to only that.
    </p>
    <h2>The Model</h2>
    <ol>
      <li>Identity: The nature of the objective itself - destroy a unit, construct a building, research a technology, etc.</li>
      <li>Priority: Is the objective required to win?</li>
      <li>Conditions: Logic associated with the objective. Does it have pre- or corequisites?</li>
      <li>Possibility: Is the objective actually possible?</li>
      <li>Time limit: Does the player have a limited time to achieve the objective?</li>
      <li>Victory/Defeat: Does the objective check for victory or loss?</li>
    </ol>
    
  </main>
</template>
