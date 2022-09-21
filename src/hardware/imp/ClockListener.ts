export interface ClockListener {
    //notifies all attached hardware when a pulse occurs
    pulse() : void
}