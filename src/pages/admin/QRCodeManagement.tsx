import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { QrCode as QrCodeIcon, Download, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';

interface QRCodeData {
    id: string;
    type: 'TABLE' | 'ROOM';
    number: string;
    url: string;
}

const QRCodeManagement = () => {
    const [qrCodes, setQrCodes] = useState<QRCodeData[]>([
        {
            id: '1',
            type: 'TABLE',
            number: '12',
            url: 'https://vivanzpalace.com/order/table/12',
        },
        {
            id: '2',
            type: 'ROOM',
            number: '205',
            url: 'https://vivanzpalace.com/order/room/205',
        },
    ]);

    const [newQR, setNewQR] = useState({
        type: 'TABLE' as 'TABLE' | 'ROOM',
        number: '',
    });

    const generateQRCode = () => {
        if (!newQR.number) {
            toast.error('Please enter a number');
            return;
        }

        const url = `https://vivanzpalace.com/order/${newQR.type.toLowerCase()}/${newQR.number
            }`;

        const qrCode: QRCodeData = {
            id: Date.now().toString(),
            type: newQR.type,
            number: newQR.number,
            url,
        };

        setQrCodes([...qrCodes, qrCode]);
        setNewQR({ type: 'TABLE', number: '' });
        toast.success('QR Code generated successfully!');
    };

    const downloadQRCode = (qrCode: QRCodeData) => {
        const svg = document.getElementById(`qr-${qrCode.id}`);
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');

            const downloadLink = document.createElement('a');
            downloadLink.download = `QR-${qrCode.type}-${qrCode.number}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();

            toast.success('QR Code downloaded!');
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold gradient-text">
                    QR Code Generator
                </h1>
                <p className="text-muted-foreground font-body mt-1">
                    Generate QR codes for tables and rooms for easy ordering
                </p>
            </div>

            {/* Generator Form */}
            <Card className="border-primary/20 bg-card/50">
                <CardHeader>
                    <CardTitle className="font-display">Generate New QR Code</CardTitle>
                    <CardDescription>
                        Create QR codes for tables or rooms
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select
                                value={newQR.type}
                                onValueChange={(value) =>
                                    setNewQR({ ...newQR, type: value as 'TABLE' | 'ROOM' })
                                }
                            >
                                <SelectTrigger className="bg-muted border-primary/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TABLE">Table</SelectItem>
                                    <SelectItem value="ROOM">Room</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Number</Label>
                            <Input
                                placeholder={newQR.type === 'TABLE' ? 'Table 12' : 'Room 205'}
                                value={newQR.number}
                                onChange={(e) => setNewQR({ ...newQR, number: e.target.value })}
                                className="bg-muted border-primary/20"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                onClick={generateQRCode}
                                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                            >
                                <Plus size={18} className="mr-2" />
                                Generate QR Code
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* QR Codes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qrCodes.map((qrCode, index) => (
                    <motion.div
                        key={qrCode.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-primary/20 bg-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
                            <CardHeader>
                                <CardTitle className="font-display text-lg flex items-center gap-2">
                                    <QrCodeIcon size={20} className="text-primary" />
                                    {qrCode.type} {qrCode.number}
                                </CardTitle>
                                <CardDescription className="text-xs break-all">
                                    {qrCode.url}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* QR Code Display */}
                                <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                                    <div id={`qr-${qrCode.id}`}>
                                        <QRCode
                                            value={qrCode.url}
                                            size={200}
                                            level="H"
                                            fgColor="#000000"
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <Button
                                    onClick={() => downloadQRCode(qrCode)}
                                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                                >
                                    <Download size={16} className="mr-2" />
                                    Download QR Code
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Info Card */}
            <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                        <QrCodeIcon size={20} className="text-accent" />
                        How to Use
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                        <strong className="text-foreground">1.</strong> Generate QR codes
                        for each table in your restaurant or room in your hotel.
                    </p>
                    <p>
                        <strong className="text-foreground">2.</strong> Download and print
                        the QR codes.
                    </p>
                    <p>
                        <strong className="text-foreground">3.</strong> Place them on tables
                        or in rooms for guests to scan.
                    </p>
                    <p>
                        <strong className="text-foreground">4.</strong> Guests can scan and
                        order directly from their phones!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default QRCodeManagement;
