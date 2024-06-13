import prisma from "../../db/prisma";

async function createAppointment(req, res) {
  const { user_id, appointment_date, appintment_time, status, slot_id } =
    req.body;
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        user_id,
        appointment_date,
        admissionNo,
        appintment_time,
        status: "reserved",
      },
    });

    const bookSlot = await prisma.slot.update({
      where: { id: parseInt(slot_id) },
      data: { availability: "reserved" },
    });

    return res.status(201).json({
      message: "appointment successfully booked",
      data: newAppointment,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function cancelAppointment(req, res) {
  const { appointment_id } = req.body;
  try {
    const newAppointment = await prisma.appointment.update({
      where: { appointment_id: parseInt(appointment_id) },
      data: {
        status: "canceled",
      },
    });

    const cancelSlot = await prisma.slot.update({
      where: { appointmentId: appointment_id },
      data: {
        availability: "canceled",
      },
    });

    return res.status(200).json({ message: "Reservation cancelled" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getBookedAppointments(req, res) {
  const { user_id } = req.body;
  try {
    const availableSlots = await prisma.appointment.findMany({
      where: {
        user_id,
        status: "available",
      },
    });

    return res.status(200).json({
      data: availableSlots,
      message: "slots getting successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getAvailableSlots(req, res) {
  try {
    const availableSlots = await prisma.slot.findMany({
      where: {
        availability: "available",
      },
    });

    return res.status(200).json({
      data: availableSlots,
      message: "slots getting successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
