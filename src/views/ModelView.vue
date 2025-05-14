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
    <section>
      <div class="attr text">
        <h2 class="attr-title">Text</h2>
        <p>The actual text the game displays to the player</p>
      </div>
      <div class="attr identity">
        <h2 class="attr-title">Identity</h2>
        <p>What kind of game action the player needs to take</p>
      </div>
      <div class="attr priority">
        <h2 class="attr-title">Priority</h2>
        <p>Whether the objective is required for victory, directly or indirectly</p>
      </div>
      <div class="attr success-effects">
        <h2 class="attr-title">Success Effects</h2>
        <p>Game effects triggered upon completing an objective</p>
      </div>
      <div class="attr failure-effects">
        <h2 class="attr-title">Failure Effects</h2>
        <p>Game effects triggered upon failing an objective</p>
      </div>
      <div class="attr time">
        <h2 class="attr-title">Time</h2>
        <p>What kind of time constrain the objective is under, if any</p>
      </div>
      <div class="attr conditions">
        <h2 class="attr-title">Conditions</h2>
        <p>Extra logic associated with the objective</p>
      </div>
      <div class="attr possible">
        <h2 class="attr-title">Possible</h2>
        <p>Whether the objective is actually possible to complete</p>
      </div>
    </section>
    <h2>Breaking it down</h2>
    <p>
      To start, I should explain what I mean by objective. A game objective is an action the player
      is told to take in order to progress the game. Importantly, I am considering objectives at
      that level of communication - not how they are implemented in the game programming.
    </p>
    <p>
      First is the actual objective text - how it is displayed in-game to the player. This will
      usually be displayed in some menu and/or UI element, perhaps along with a voiceline.
    </p>
    <p>
      Second, we have the objective's identity. This is the nature of the objective itself - for
      example, move a unit, destroy a building, or research a technology. There are a great many of
      these, and a game's systems will determine what kinds of objectives are even possible in it,
      so all possible identities are not currently listed here.
    </p>
    <p>
      Next is the priority. Primary objectives must be completed in order to win a scenario, while
      secondary objectives are optional.
    </p>
    <p>
      Completing objectives can have various effects, such as triggering victory or defeat, adding
      new objectives, or removing existing objectives.
    </p>
    <p>
      Sometimes objectives will have a time limit. Statically timed objectives have a fixed timer,
      while dynamically timed objectives can be affected by the player somehow. For example, the
      player may be given secondary objectives which, upon completion, aid them by increasing or
      decreasing the time limit.
    </p>
    <p>
      Objectives can have logic associated with them, requiring one or more other objectives to have
      been completed in order to be unlocked, or only being possible if another objective has not
      been completed. This can be combined with "Remove objective" effects to create
      mutually-exclusive choices for players.
    </p>
    <p>
      I added possibility as a field because, rarely, a scenario will give the player an objective
      that is impossible to complete, generally for narrative effect.
    </p>

    <h3>Some other notes</h3>
    <h4>Plurals</h4>
    <p>
      I have chosen not to distinguish between singular and plural options here. For identity, this
      mean "defeat 4 players" will be simplified to "defeat player". Also worth noting is an
      interaction between effects and conditions - an objective could add/remove multiple other
      objectives, and an objective may also have multiple prerequisites. As such, an objective may
      be categorized as adding another objective when that second objective will only be added once
      the other prerequisites are met. I considered attempting to more explicitly highlight this
      case in the model, but was not convinced it was worth it.
    </p>
    <p>Also, is "objective" starting to not feel like a real word to anyone else now?</p>
    <h4>Primary vs Victory/Defeat</h4>
    <p>
      At first glance it may seem that checking for victory/defeat should be the same as a primary
      objective. The difference between these is that a primary objective may be required in order
      to win but not itself check for victory. For example, a scenario may require the player to
      move a unit, then destroy a building, and then research a technology to win. The first two
      objectives are required (and therefore primary objectives), but only the third triggers
      victory.
    </p>
    <h4>Special constructions</h4>
    <p>
      I considered making one quality "assignment", to describe whether obbjectives are
      automatically assigned by the game or voluntarily selected by the player. Upon further
      consideration, I think this is just a case of secondary objectives serving as prerequisites to
      new primary objectives, rather than its own separate quality. Nonetheless, this is a unique
      construction that I rarely - if ever - see in games, with considerable potential for
      interesting gameplay and narrative. I highly encourage designers to play with this!
    </p>
    <h4>Categorization</h4>
    <p>
      Categorizing objectives can be more of an art than a science. An impossible objective to
      defend a building is logically equivalent to destorying the building, for example; for
      another, an objective like "Defeat 2 of 3 enemies" could be considered one single objective
      with no logic, or 3 separate exclusive objectives. I will generally try to categorize
      objectives based on how the game presents them to the player.
    </p>
    <h4>Extending the options for effects</h4>
    <p>
      Something I am not yet tracking is objective effects other than victory, defeat, and unlocking
      new objectives, but I may add this in the future. There are a great many things objectives can
      trigger - gaining resources, gaining control of units, and changing AI behavior, to name a
      few.
    </p>
  </main>
</template>

<style scoped>
p {
  line-height: 20px; /* within paragraph */
  margin-bottom: 10px; /* between paragraphs */
}

section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.attr {
  border: 2px solid black;
  /*flex: 1;*/
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 150px;
  text-align: center;
}

.attr-title {
  text-align: center;
}
</style>
