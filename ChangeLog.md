# V.1.3.4 - Item Reset Fix
*Deployed 12/24/2020*
- fixed a major bug where items were displaying as already bought if playing multiple times in a row
- added two new 5 cost items to the Cleric

# V.1.3.3 - Roadblocks
*Deployed 12/24/2020*
- prevented access to game via mobile devices
- for people who don't want to sign up with an email address I've allowed signup through a username and password
- fixed issue with the LOGOUT_USER action nullifying player data


# V.1.3.2 - More Tooltips & Bug Squashing
*Deployed 12/22/2020*
- Added Tooltips to Dungeon Phase
- Made Tooltip component more robust and adaptable, accepting more props.
- Semantic changes and new warning on Saved Game phase.
- Fixed an issue where the game was failing to reset the roster number and monster fought causing new games to start fighting higher roster monsters.
- Added your current score to the login bar, which now is displayed during gameplay.
- Fixed some typos.
- Added a default save state to prevent errors on registration without Google login.
- Made monster generation more explicit, and it is more consistent when restarting and playing subsequent games.


# V.1.3.1 - Database Changes & Tooltip Hot Fix
*Deployed 12/21/2020*

## CHANGES
- Worked on some tool tips for the Dungeon Phase. Positioning is a bit messy, I'll clean it up in the next small release sometime in January 2021.
- Fixed some styling issues with the old tooltips.
- Saving your progress is now up to you. The game no longer auto saves frequently, which will increase the amount of people able to play the game per day based on Database restrictions with Google Firebase.

## BUG FIXES
- Fixed a leaderboard breaking bug where the players score was persisting between character deaths, allowing one dedicated player *CRASHDADDY* to amass a score of over 200,000

   ![CRASHDADDY!!!!!!](public/assets/changelog/crashdaddy.PNG)

- Fixed issue where saved game data would appear on the Saved Game/Main Menu screen despite not actually existing.


# V.1.3.0 - Quality of Life Changes and Gameplay Changes
*Deployed 12/18/2020*

## BIG CHANGES
- Varlet and Mage Special Abilities have changed!
   - Mage's Variagate ability now halves the monsters health (rounding up) at time of use. Can be stacked. A Monster with 10 HP will be reduced to 5, then to 3, then to 2 after three complete uses. Variagate works best on monsters with a lot of health.
   - Varlet's ability has changed to deal 1/4 your max attack score (rounding up). If your ability kills a monster, you'll gain 1 extra coin along with the coins gained for defeating the monster.
- Attack Roll randomization is more consistently middle of the road. The RNG (Random Number Generation) for attack was too random, and I’ve made it more consistently roll towards the middle between 1 and your highest possible damage.

## AUDIO CHANGES
- Remixed and mastered all audio for the game using conditional volumes for Howler to make the audio less varied and entire audio experience enjoyable.

## GENERAL CHANGES
- Added a Tool Tip Component to improve gameplay help for new players. Hovering over certain things will now provide context clues. Try it out! I'll be adding more as I improve the game.
- Added a setting cog to the Login Bar, for now you can use this to change your preferences for using tooltips which will help newcomers learn how to play the game. More settings will be available as the game improves and updates.
- New hovertext for character portraits in the dungeon phase.
- Fixed issue with armor icon not appearing during Swordsman En'garde

# V.1.2.1 - Small Style Changes & Bug Squashing
*Deployed 12/3/2020*

## BUG FIXES
- Fixed a few issues with the helpers across all game phases displaying incorrectly and at odd aspect ratios.
- Turn Tail was not resetting after every fight. It now behaves appropriately and can be attempted once per monster encounter.
- Fixed a major big where scores we're AGAIN not being sent to the leaderboard.
- Removed console log that was predicting the next monster to be fought.
- Fixed a bug where the the mage and varlets specials were locking up the combat system.

# V.1.2.0 - More Bug Fixes & New Icons
*New version out 11/29/2020*

## BUG FIXES
- fixed leaderboards again, something was wrong with the upload code preventing another submission to the database after achieving your first high score.
- fixed problem where special attacks would cause controls to be permanently locked and made the game unplayable.
- Fixed a bug where the "Blood Ritual" item can be repeatedly bought for free.

## CHANGES
- Adorable API for player icons has been discontinued or is broken, I've replaced it with DiceBear API.
- Added in the ability to see your own highest score even if you didn't rank on the leaderboards.

## NEW FEATURES
- If a physical attacking monster is unable to hit you due to your armor being higher than their attack max, you will kill them outright.

# V.1.1.0 - Small Bug Fixes & Leader Board Fix
*New version out one day after launch. 10/16/2020*

## FIXES
- fixed bug that caused instructions to not appear on the lose screen after dying
- fixed a bug in CSS that caused monster list on retire screen or game over screen to have a trailing comma
- fixed a bug where mage and varlet special would permanently lock combat controls.
- fixed a bug where players could perfectly exhaust the list of monsters and be met with a white screen, save file would be corrupt and players couldn't progress further

## NEW ADDITIONS
- added discord links to homepage

## CHANGES
- removed some higher concept functional items from the game until they can be properly implemented