import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Participant {
  _id?: string;
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
}

export const exportToPDF = (participants: Participant[], fileName: string) => {
  const doc = new jsPDF();
  const tableColumn = ["Name", "Email", "Phone"];
  const tableRows: any[] = [];

  participants.forEach(participant => {
    const participantData = [
      participant.username,
      participant.email,
      participant.phone,
    ];
    tableRows.push(participantData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.text("Participants List", 14, 15);
  doc.save(`${fileName}.pdf`);
};