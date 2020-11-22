import { videoListStore } from './store/Videolist';
import { userStore } from './store/User';

const useStore = () => {
  return { videoListStore, userStore };
};

export default useStore;
