/**
 * Classe que controla o cronometro.
 */

export default class Chronometer {
  constructor() {
    this._startTime = null;
    this._stopTime = null;
    this._isRunning = false;
  }

  /** Returns the actual time stamp in milliseconds */
  static timeStamp = () => new Date().getTime()

  /** Returns the timeStamp formated in HH:MM:SS:mmm */
  static formatStamp = (stamp) => {
    const milliseconds = parseInt(stamp % 1000, 10);
    const seconds = parseInt((stamp / 1000) % 60, 10);
    const minutes = parseInt((stamp / 1000) / 60, 10) % 60;
    const hours = parseInt(((stamp / 1000) / 60) / 60, 10) % 60;

    const stringToPad = (string, padSize, padString) => string.toString().padStart(padSize, padString);

    return (`${stringToPad(hours, 2, 0)}:${stringToPad(minutes, 2, 0)}:${stringToPad(seconds, 2, 0)}:${stringToPad(milliseconds, 3, 0)}`);
  }

  startTimer = () => {
    if (this._isRunning)
      return;
    else if (this._startTime != null)
      this._stopTime = null;

    this._isRunning = true;
    this._startTime = Chronometer.timeStamp();
  }

  stopTimer = () => {
    if (!this._isRunning)
      return;

    this._stopTime = Chronometer.timeStamp();
    this._isRunning = false;
  }

  getTotalTimer = () => {
    if (this._startTime && this._stopTime)
      return (this._stopTime - this._startTime);

    return null;
  }

  getCurrentTimer = () => {
    if (this._isRunning)
      return Chronometer.timeStamp() - this._startTime;

    return this.getTotalTimer();
  }
}
