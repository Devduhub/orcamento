import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportProposalToPDF = async (elementId, filename = 'Proposta_UxForYou.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    document.body.style.cursor = 'wait';

    // Look for dedicated .pdf-page elements
    const pageElements = element.querySelectorAll('.pdf-page');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    if (pageElements && pageElements.length > 0) {
      // Multi-page exact A4 rendering: 1 html2canvas per page
      for (let i = 0; i < pageElements.length; i++) {
        const page = pageElements[i];

        const canvas = await html2canvas(page, {
          scale: 2, // High resolution crisp text
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: 1200,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.96);

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
    } else {
      // Fallback if no .pdf-page elements found
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1200,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 5) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
    }

    // Save generated PDF
    pdf.save(filename);
    document.body.style.cursor = 'default';
    return true;
  } catch (err) {
    console.error('Error generating PDF proposal:', err);
    document.body.style.cursor = 'default';
    alert('Ocorreu um erro ao gerar o PDF. Por favor tente novamente.');
    return false;
  }
};

