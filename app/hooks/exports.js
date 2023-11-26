'use client'

import { Document, Packer, Paragraph, Table, TableRow, TableCell, convertInchesToTwip, AlignmentType, TextRun, WidthType, ShadingType, Tab, BorderStyle, ImageRun  } from "docx";
import { saveAs } from "file-saver";
import shopLogo from "../../public/images/logo.png"

export default function Exports ()
{
    const buffImage = async () => {
        const imageUrl = '../../public/images/logo.png'
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer()

        const uint8Array = new Uint8Array(arrayBuffer)
        return uint8Array
    }
    const reports = (arr, reportDate) => {
        let tableRows = []
        const header = new TableRow({
            children: [
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Date")
                    ]
                }),
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Customer")
                    ]
                }),
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Transaction No.")
                    ]
                }),
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Package")
                    ]
                }),
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Quantity")
                    ]
                }),
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Price")
                    ]
                }),
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Capital")
                    ]
                }),
                new TableCell({
                    shading: {
                        fill: "FA995D",
                        type: ShadingType.CLEAR,
                        color: "FFFFFF",
                    },
                    children: [
                        new Paragraph("Profit")
                    ]
                })
            ]
        })
        tableRows.push(header)
        arr.forEach(element => {
            const profit = parseFloat(element?.package?.total_price) - parseFloat(element?.package?.capital)
            const row = new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph(new Date(element.order_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              }))
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(element.user.name)
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(element.transaction_number)
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(element?.package?.name)
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(element.quantity.toString())
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(Number(element?.package?.total_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(Number(element?.package?.capital).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(Number(profit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
                        ]
                    })
                ]
            })  
            tableRows.push(row)
        })
        const totalPrice = arr.reduce((acc,element)=>acc+element?.package?.total_price,0) ?? 0
        const inputDate = new Date(reportDate)
        const firstDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1)
        const lastDay = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0)
        const formattedFirstDay = firstDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        const formattedLastDay = lastDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        const table = new Table({
            alignment: AlignmentType.CENTER,
            width: { size: "100%", type: "auto" },
            rows: tableRows,
        });
        // const imageBuffer = buffImage()
        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            // new ImageRun({
                            //     data: imageBuffer,
                            //     transformation: {
                            //         width: 200,
                            //         height: 200,
                            //     },
                            //     floating: {
                            //         horizontalPosition: {
                            //             offset: 1014400,
                            //         },
                            //         verticalPosition: {
                            //             offset: 1014400,
                            //         },
                            //     },
                            // }),
                            new TextRun({text: 'A & F Gift and Love Delivery Bulan', size: 32, bold: true})
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({text: 'Purok-5  G. Del Pilar, Bulan, Sorsogon', size: 24})]
                    }),
                    new Paragraph(""),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({text: 'Monthly Sales Report', bold: true, size: 24})]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [new TextRun({text: 'Date Period: ', bold: true, size: 24}), new TextRun({text: formattedFirstDay+' - '+formattedLastDay})]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [new TextRun({text: 'Total Sales: ', bold: true, size: 24}), new TextRun(Number(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))]
                    }),
                    table
                ]
            }]
        })
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "A&F-reports-"+reportDate+".docx");
        })
    }

    return {reports}
}