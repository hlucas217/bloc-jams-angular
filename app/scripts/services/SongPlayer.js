(function() { 
    
    function SongPlayer() {
        var SongPlayer = {};
         
        /**
        * @desc audio file that is playing now
        * @type {object}
        */
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
        }; 
        
        /**
        * @function playSong
        * @desc plays the new Buzz sound object
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        * @function play
        * @desc considers what to do if the currently playing song is/is not the same as the song the user clicks on
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);             
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
         
        /**
        * @function pause
        * @desc pauses the current Buzz sound object
        * @param {Object} song
        * @return SongPlayer
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
         
        return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
