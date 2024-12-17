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
      <li>Identity</li>
      <li>Priority</li>
      <ul>
        <li>Primary</li>
        <li>Secondary</li>
      </ul>
      <li>Victory/Defeat</li>
      <ul>
        <li>None</li>
        <li>Victory</li>
        <li>Defeat</li>
      </ul>
      <li>Time limit</li>
      <ul>
        <li>Untimed</li>
        <li>Statically timed</li>
        <li>Dynamically timed</li>
      </ul>
      <li>Conditions</li>
      <ul>
        <li>None</li>
        <li>Prerequisite</li>
        <li>Successor</li>
        <li>Exclusive</li>
      </ul>
      <li>Possibility</li>
      <ul>
        <li>Possible</li>
        <li>Impossible</li>
      </ul>
    </ol>
    <h2>Breaking it down</h2>
    <p>
      To start, I should explain what I mean by objective. A game objective is an action the player
      is told to take in order to progress the game. Importantly, I am considering objectives at
      that level of communication - not how they are implemented in the game programming.
    </p>
    <p>
      First we have the objective's identity. This is the nature of the objective itself - for
      example, move a unit, destroy a building, or research a technology. There are a great many of
      these, and a game's systems will determine what kinds of objectives are even possible in it,
      so all possible identities are not currently listed here.
    </p>
    <p>
      Next is the priority. Primary objectives must be completed in order to win a scenario, while
      secondary objectives are optional.
    </p>
    <p>
      Related but distinct is whether completing an objective will trigger a victory check, or if
      failing to complete it will trigger a defeat check - or neither. The difference between these
      and a primary objective is that a primary objective may be required in order to win but not
      itself check for victory. For example, a scenario may require the player to move a unit, then
      destroy a building, and then research a technology to win. The first two objectives are
      required (and therefore primary objectives), but only the third triggers victory.
    </p>
    <p>
      Sometimes objectives will have a time limit. Statically timed objectives have a fixed timer,
      while dynamically timed objectives can be affected by the player somehow. For example, the
      player may be given secondary objectives which, upon completion, aid them by increasing or
      decreasing the time limit.
    </p>
    <p>
      Conditions refers to meta logic associated with an objective. Completing an objective may
      unlock other objectives, making it a prerequisite. An objective with a prerequisite I have
      decided to call a successor. A successor objective may have more than one prerequisites, and
      it may require all of them to be completed or only a subset. Sometimes objectives are part of
      exclusive choices - the player may complete objective A, or objective B, but not both.
    </p>
    <p>
      I added possibility as a field because, rarely, a scenario will give the player an objective
      that is impossible to complete, generally for narrative effect.
    </p>
    <h3>Some other notes</h3>
    <p>
      Categorizing objectives can be more of an art than a science. An impossible objective to
      defend a building is logically equivalent to destorying the building, for example; for
      another, an objective like "Defeat 2 of 3 enemies" could be considered one single objective
      with no logic, or 3 separate exclusive objectives. I will generally try to categorize
      objectives based on how the game presents them to the player.
    </p>
  </main>
</template>

<style>
p {
  line-height: 20px; /* within paragraph */
  margin-bottom: 10px; /* between paragraphs */
}
</style>
