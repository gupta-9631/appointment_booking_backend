-- CreateEnum
CREATE TYPE "SlotAvailability" AS ENUM ('available', 'reserved', 'canceled');

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "availability" "SlotAvailability" NOT NULL,
    "appointmentId" INTEGER,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("appointment_id") ON DELETE SET NULL ON UPDATE CASCADE;
