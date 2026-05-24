package com.budly.invoice;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class InvoiceGenerator {

    private static final String INVOICES_DIR = "invoices";

    private static final BaseColor INK           = new BaseColor(15,  20,  25);
    private static final BaseColor CANOPY        = new BaseColor(22,  72,  45);
    private static final BaseColor STEM          = new BaseColor(52, 130,  82);
    private static final BaseColor FROST         = new BaseColor(245, 249, 246);
    private static final BaseColor MIST          = new BaseColor(232, 242, 235);
    private static final BaseColor ASH           = new BaseColor(108, 120, 112);
    private static final BaseColor RULE          = new BaseColor(195, 215, 200);
    private static final BaseColor MARK          = new BaseColor(224, 238, 227);

    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("dd MMM yyyy  ·  HH:mm");

    private static final Font F_WORDMARK     = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD,   CANOPY);
    private static final Font F_TAGLINE      = new Font(Font.FontFamily.HELVETICA,  8, Font.ITALIC, ASH);
    private static final Font F_STAMP        = new Font(Font.FontFamily.HELVETICA,  7, Font.BOLD,   STEM);
    private static final Font F_META_LABEL   = new Font(Font.FontFamily.HELVETICA,  7, Font.BOLD,   ASH);
    private static final Font F_META_VALUE   = new Font(Font.FontFamily.HELVETICA,  9, Font.NORMAL, INK);
    private static final Font F_SECTION      = new Font(Font.FontFamily.HELVETICA,  7, Font.BOLD,   ASH);
    private static final Font F_BILLED_NAME  = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD,   INK);
    private static final Font F_BILLED_EMAIL = new Font(Font.FontFamily.HELVETICA,  9, Font.NORMAL, ASH);
    private static final Font F_TH           = new Font(Font.FontFamily.HELVETICA,  8, Font.BOLD,   BaseColor.WHITE);
    private static final Font F_TD           = new Font(Font.FontFamily.HELVETICA,  9, Font.NORMAL, INK);
    private static final Font F_SUB_LABEL    = new Font(Font.FontFamily.HELVETICA,  9, Font.NORMAL, ASH);
    private static final Font F_SUB_VALUE    = new Font(Font.FontFamily.HELVETICA,  9, Font.NORMAL, INK);
    private static final Font F_TOTAL_LABEL  = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD,   BaseColor.WHITE);
    private static final Font F_TOTAL_VALUE  = new Font(Font.FontFamily.HELVETICA, 11, Font.BOLD,   BaseColor.WHITE);
    private static final Font F_FOOTER       = new Font(Font.FontFamily.HELVETICA,  8, Font.NORMAL, ASH);
    private static final Font F_WATERMARK    = new Font(Font.FontFamily.HELVETICA, 64, Font.BOLD,   MARK);

    public static String generateInvoice(String invoiceId,
                                         String userName,
                                         String userEmail,
                                         String paymentId,
                                         List<String> items,
                                         double totalAmount) {

        String filePath = INVOICES_DIR + "/invoice_" + invoiceId + ".pdf";
        Document document = new Document(PageSize.A4, 52, 52, 52, 52);

        try {
            File dir = new File(INVOICES_DIR);
            if (!dir.exists()) dir.mkdirs();

            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();

            stampWatermark(writer);
            renderHeader(document);
            renderMeta(document, invoiceId, paymentId, userName, userEmail);
            renderLineItems(document, items, totalAmount);
            renderTotals(document, totalAmount);
            renderFooter(document);

            document.close();
            return filePath;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (document.isOpen()) document.close();
        }
    }

    private static void renderHeader(Document doc) throws Exception {
        PdfPTable top = new PdfPTable(2);
        top.setWidthPercentage(100);
        top.setWidths(new float[]{3f, 1f});
        top.setSpacingAfter(28);

        PdfPCell brand = new PdfPCell();
        brand.setBorder(Rectangle.NO_BORDER);
        brand.setPaddingTop(4);

        Paragraph wordmark = new Paragraph("Snap", F_WORDMARK);
        wordmark.setSpacingAfter(3);
        brand.addElement(wordmark);
        brand.addElement(new Paragraph("A safe working place for all!!", F_TAGLINE));
        top.addCell(brand);

        PdfPCell badge = new PdfPCell();
        badge.setBackgroundColor(CANOPY);
        badge.setBorder(Rectangle.NO_BORDER);
        badge.setPaddingTop(10);
        badge.setPaddingBottom(10);
        badge.setPaddingLeft(14);
        badge.setPaddingRight(14);
        badge.setHorizontalAlignment(Element.ALIGN_RIGHT);
        badge.setVerticalAlignment(Element.ALIGN_MIDDLE);

        Paragraph inv = new Paragraph("TAX INVOICE", F_STAMP);
        inv.setAlignment(Element.ALIGN_RIGHT);
        badge.addElement(inv);
        top.addCell(badge);

        doc.add(top);
        doc.add(new LineSeparator(0.5f, 100f, RULE, Element.ALIGN_CENTER, -1));
        doc.add(Chunk.NEWLINE);
    }

    private static void renderMeta(Document doc, String invoiceId, String paymentId, String name, String email) throws Exception {
        PdfPTable meta = new PdfPTable(3);
        meta.setWidthPercentage(100);
        meta.setWidths(new float[]{1f, 1f, 1.2f});
        meta.setSpacingAfter(24);

        meta.addCell(metaBlock("INVOICE NO.", invoiceId));
        meta.addCell(metaBlock("PAYMENT REF.", paymentId));
        meta.addCell(metaBlock("DATE ISSUED", LocalDateTime.now().format(DATE_FORMATTER)));

        doc.add(meta);

        PdfPTable billing = new PdfPTable(2);
        billing.setWidthPercentage(100);
        billing.setWidths(new float[]{1f, 1f});
        billing.setSpacingAfter(22);

        PdfPCell billedTo = new PdfPCell();
        billedTo.setBorder(Rectangle.LEFT);
        billedTo.setBorderColorLeft(STEM);
        billedTo.setBorderWidthLeft(2.5f);
        billedTo.setPaddingLeft(12);
        billedTo.setPaddingTop(6);
        billedTo.setPaddingBottom(6);

        billedTo.addElement(new Paragraph("BILLED TO", F_SECTION));
        Paragraph nameP = new Paragraph(name, F_BILLED_NAME);
        nameP.setSpacingBefore(5);
        billedTo.addElement(nameP);
        billedTo.addElement(new Paragraph(email, F_BILLED_EMAIL));

        PdfPCell blank = new PdfPCell();
        blank.setBorder(Rectangle.NO_BORDER);

        billing.addCell(billedTo);
        billing.addCell(blank);
        doc.add(billing);
    }

    private static PdfPCell metaBlock(String label, String value) {
        PdfPCell cell = new PdfPCell();
        cell.setBorder(Rectangle.BOTTOM);
        cell.setBorderColorBottom(RULE);
        cell.setBorderWidthBottom(0.5f);
        cell.setPaddingBottom(10);
        cell.setPaddingTop(2);
        cell.setPaddingRight(12);

        Paragraph l = new Paragraph(label, F_META_LABEL);
        l.setSpacingAfter(3);
        cell.addElement(l);
        cell.addElement(new Paragraph(value, F_META_VALUE));
        return cell;
    }

    private static void renderLineItems(Document doc, List<String> items, double totalAmount) throws Exception {
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{0.5f, 4.5f, 1f, 1.5f});
        table.setSpacingAfter(20);

        table.addCell(th("#",           Element.ALIGN_CENTER));
        table.addCell(th("DESCRIPTION", Element.ALIGN_LEFT));
        table.addCell(th("QTY",         Element.ALIGN_CENTER));
        table.addCell(th("AMOUNT (₹)",  Element.ALIGN_RIGHT));

        double price = totalAmount / items.size();

        for (int i = 0; i < items.size(); i++) {
            BaseColor bg = (i % 2 == 0) ? BaseColor.WHITE : FROST;

            table.addCell(td(String.valueOf(i + 1),               Element.ALIGN_CENTER, bg));
            table.addCell(td(items.get(i),                         Element.ALIGN_LEFT,   bg));
            table.addCell(td("1",                                  Element.ALIGN_CENTER, bg));
            table.addCell(td(String.format("%.2f", price),         Element.ALIGN_RIGHT,  bg));
        }

        doc.add(table);
    }

    private static PdfPCell th(String text, int alignment) {
        PdfPCell cell = new PdfPCell(new Phrase(text, F_TH));
        cell.setBackgroundColor(CANOPY);
        cell.setHorizontalAlignment(alignment);
        cell.setPaddingTop(10);
        cell.setPaddingBottom(10);
        cell.setPaddingLeft(10);
        cell.setPaddingRight(10);
        cell.setBorder(Rectangle.NO_BORDER);
        return cell;
    }

    private static PdfPCell td(String text, int alignment, BaseColor bg) {
        PdfPCell cell = new PdfPCell(new Phrase(text, F_TD));
        cell.setBackgroundColor(bg);
        cell.setHorizontalAlignment(alignment);
        cell.setPaddingTop(9);
        cell.setPaddingBottom(9);
        cell.setPaddingLeft(10);
        cell.setPaddingRight(10);
        cell.setBorder(Rectangle.BOTTOM);
        cell.setBorderColorBottom(RULE);
        cell.setBorderWidthBottom(0.4f);
        return cell;
    }

    private static void renderTotals(Document doc, double total) throws Exception {
        PdfPTable wrap = new PdfPTable(2);
        wrap.setWidthPercentage(46);
        wrap.setHorizontalAlignment(Element.ALIGN_RIGHT);
        wrap.setSpacingAfter(26);

        wrap.addCell(subRow("Subtotal",  String.format("%.2f", total * 0.9), false));
        wrap.addCell(subRow("",          "",                                  false));
        wrap.addCell(subRow("GST (10%)", String.format("%.2f", total * 0.1), false));
        wrap.addCell(subRow("",          "",                                  false));

        PdfPCell totalLeft = new PdfPCell(new Phrase("TOTAL PAYABLE", F_TOTAL_LABEL));
        totalLeft.setBackgroundColor(CANOPY);
        totalLeft.setBorder(Rectangle.NO_BORDER);
        totalLeft.setPaddingTop(11);
        totalLeft.setPaddingBottom(11);
        totalLeft.setPaddingLeft(12);
        totalLeft.setHorizontalAlignment(Element.ALIGN_LEFT);

        PdfPCell totalRight = new PdfPCell(new Phrase("₹" + String.format("%.2f", total), F_TOTAL_VALUE));
        totalRight.setBackgroundColor(CANOPY);
        totalRight.setBorder(Rectangle.NO_BORDER);
        totalRight.setPaddingTop(11);
        totalRight.setPaddingBottom(11);
        totalRight.setPaddingRight(12);
        totalRight.setHorizontalAlignment(Element.ALIGN_RIGHT);

        wrap.addCell(totalLeft);
        wrap.addCell(totalRight);

        doc.add(wrap);
    }

    private static PdfPCell subRow(String label, String value, boolean dummy) {
        boolean isLabel = !label.isEmpty();
        PdfPCell cell = new PdfPCell(new Phrase(isLabel ? (value.isEmpty() ? label : label) : value,
                isLabel && value.isEmpty() ? F_SUB_LABEL : (label.isEmpty() ? F_SUB_VALUE : F_SUB_LABEL)));
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setPaddingTop(5);
        cell.setPaddingBottom(5);
        cell.setPaddingLeft(12);
        cell.setPaddingRight(12);
        cell.setHorizontalAlignment(label.isEmpty() ? Element.ALIGN_RIGHT : Element.ALIGN_LEFT);
        return cell;
    }

    private static void renderFooter(Document doc) throws Exception {
        doc.add(new LineSeparator(0.4f, 100f, RULE, Element.ALIGN_CENTER, -1));
        doc.add(Chunk.NEWLINE);

        PdfPTable footer = new PdfPTable(2);
        footer.setWidthPercentage(100);

        PdfPCell left = new PdfPCell();
        left.setBorder(Rectangle.NO_BORDER);
        left.addElement(new Paragraph("Thank you for growing with Snap 🌿", F_FOOTER));

        PdfPCell right = new PdfPCell();
        right.setBorder(Rectangle.NO_BORDER);
        Paragraph contact = new Paragraph("dummy@gmail.com  ·  www.dummy.live", F_FOOTER);
        contact.setAlignment(Element.ALIGN_RIGHT);
        right.addElement(contact);

        footer.addCell(left);
        footer.addCell(right);
        doc.add(footer);
    }

    private static void stampWatermark(PdfWriter writer) {
        PdfContentByte canvas = writer.getDirectContentUnder();
        Phrase watermark = new Phrase("SNAP", F_WATERMARK);
        ColumnText.showTextAligned(canvas, Element.ALIGN_CENTER, watermark, 297f, 390f, 38);
    }
}
