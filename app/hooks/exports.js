'use client'

import { Document, Packer, Paragraph, Table, TableRow, TableCell, convertInchesToTwip, AlignmentType, TextRun, WidthType, ShadingType, Tab, BorderStyle  } from "docx";
import { saveAs } from "file-saver";

export default function Exports ()
{
    const reports = (arr, reportDate) => {
        let tableRows = []
        arr.forEach(element => {
            const row = new TableRow({
                children: [
                    new TableCell({
                        children: [
                            
                        ]
                    })
                ]
            })  
            tableRows.push(row)
        })
        const table = new Table({
            alignment: AlignmentType.CENTER,
            width: { size: "100%", type: "auto" },
            rows: tableRows,
        });
        const doc = new Document({
            sections: [{
                children: [table]
            }]
        })
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "A&F-reports-"+reportDate+".docx");
        })
    }

    return {reports}
}