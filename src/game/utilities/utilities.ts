export const isOnIOS = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false; // Not in a browser environment
    }
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}