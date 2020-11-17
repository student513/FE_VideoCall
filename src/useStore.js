import { videoListStore } from './store/Videolist';
import { tokenStore } from './store/Token';

const useStore = () => {
  return { videoListStore, tokenStore };
};

export default useStore;
