import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  try {
    TrackPlayer.addEventListener('remote-play', () => {
      TrackPlayer.play();
    });

    TrackPlayer.addEventListener('remote-pause', () => {
      TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-next', () => {
      TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener('remote-previous', () => {
      TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener('remote-stop', async () => {
      await TrackPlayer.stop();
      await TrackPlayer.reset(); // Ensures it completely stops
    });

    // Stop the player when the app is killed
    TrackPlayer.addEventListener('playback-state', async (state) => {
      if (state.state === TrackPlayer.STATE_STOPPED) {
        await TrackPlayer.destroy(); // Completely destroy TrackPlayer when stopped
      }
    });

  } catch (error) {
    console.log('TrackPlayer Error:', error);
  }
};
