/* eslint-disable react/prop-types */

import { Button } from '@mui/material';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {  FaDownload } from 'react-icons/fa';

const DownloadReceiptButton = ({ order , user}) => {
  
  console.log(order.products);
  
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // Titre principal
    doc.setFontSize(18);
    doc.text("Reçu de Commande", 105, 20, { align: "center" });

    // Informations sur la commande
    doc.setFontSize(12);
    doc.text(`Numéro de commande : ${order.orderNumber}`, 10, 40);
    doc.text(`Date de commande : ${order.orderDate}`, 10, 50);
    doc.text(`Client : ${user.name}`, 10, 60);
    doc.text(`Adresse : ${user.address}`, 10, 70);
    doc.text(`Téléphone : ${user.phone}`, 10, 80);

    // Tableau des produits
    const productRows = order.products.map((product) => [
      product.name,
      product.description,
      product.quantity,
      `$${product.price}`,
      `$${(product.quantity * product.price).toFixed(2)}`,
    ]);

    productRows.push([
      { content: "Total Général", colSpan: 4, styles: { halign: "right", fontStyle: "bold" } },
      `$${order.total.toFixed(2)}`,
    ]);

    doc.autoTable({
      startY: 90,
      head: [["Nom du produit", "Description", "Quantité", "Prix unitaire", "Total"]],
      body: productRows,
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10 },
    });

    // Total de la commande
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`LabeShop vous remerci pour votre commande`, 10, finalY);

    // Téléchargement du fichier PDF
    doc.save(`recu_commande_${order.orderNumber}.pdf`);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<FaDownload />}
      onClick={handleDownloadReceipt}
      sx={{ marginLeft: 2 }}
    >
      Télécharger le reçu
    </Button>
  );
};

export default DownloadReceiptButton;
