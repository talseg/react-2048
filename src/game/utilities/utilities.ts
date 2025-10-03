export const isOnIOS = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false; // Not in a browser environment
    }
    return isIPhone() || iSIpadOrMac()
}

export const isIPhone = () => 
  navigator.userAgent.includes("iPhone");

export const iSIpadOrMac = 
  () => navigator.userAgent.includes("Macintosh");