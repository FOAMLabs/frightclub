declare global {
    interface DeviceMotionEvent {
      requestPermission(): Promise<'granted' | 'denied'>;
    }
  }
  