import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { toBnDigits } from '../../lib/clinical';
import { useLanguage } from '../../context/LanguageContext';

export interface RxLine {
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  /** Frequency in the local "1+0+1" notation. */
  dosage: string;
  timing: string;
  duration: string;
  instructions?: string;
}

export interface PrescriptionSheetData {
  prescriptionNumber: string;
  date: string;
  doctorName: string;
  doctorDegrees: string;
  doctorBmdc: string;
  doctorSpecialty?: string;
  chamberName: string;
  chamberAddress?: string;
  chamberPhone?: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  vitals: { bp?: string; pulse?: string; temp?: string; weight?: string; spo2?: string };
  chiefComplaints?: string;
  diagnosis: string;
  medicines: RxLine[];
  investigations?: string[];
  advice?: string[];
  followUp?: string;
}

/** Verification URL encoded into the QR code on every printed sheet. */
const verifyUrl = (prescriptionNumber: string): string =>
  `${window.location.origin}/verify/${encodeURIComponent(prescriptionNumber)}`;

/**
 * BMDC-standard A4 prescription sheet.
 *
 * Rendered on screen as a preview and printed verbatim — the `@media print`
 * rules in index.css hide everything except `#printable-prescription`, so this
 * is also the PDF the browser's "Save as PDF" produces. No PDF library is
 * involved: the browser's own vector print pipeline gives sharper text,
 * and costs nothing in bundle size.
 *
 * Colours are deliberately hard-coded black/grey rather than theme tokens —
 * a prescription must print identically whatever colour mood the doctor uses.
 */
export const PrescriptionSheet: React.FC<{ data: PrescriptionSheetData }> = ({ data }) => {
  const { tr, num, isBn } = useLanguage();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(verifyUrl(data.prescriptionNumber), {
      margin: 0,
      width: 220,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#ffffff' },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch((error) => console.warn('[rx] QR generation failed', error));

    return () => {
      cancelled = true;
    };
  }, [data.prescriptionNumber]);

  const formatDigits = (val?: string | number) => {
    if (val === undefined || val === null) return '';
    return isBn ? toBnDigits(val) : String(val);
  };

  const vitals = [
    ['BP', data.vitals.bp],
    ['Pulse', data.vitals.pulse],
    ['Temp', data.vitals.temp],
    ['Wt', data.vitals.weight],
    ['SpO₂', data.vitals.spo2],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <div
      id="printable-prescription"
      lang={isBn ? 'bn' : 'en'}
      className="bg-white text-black font-sans mx-auto"
      style={{ width: '190mm', minHeight: '260mm', padding: '0', fontSize: '11pt' }}
    >
      {/* Letterhead */}
      <header className="no-break flex items-start justify-between border-b-[3px] border-black pb-2">
        <div>
          <h1 className="text-[15pt] font-black leading-tight">{data.doctorName}</h1>
          <p className="text-[9.5pt] leading-snug">{data.doctorDegrees}</p>
          {data.doctorSpecialty && (
            <p className="text-[9.5pt] leading-snug italic">{data.doctorSpecialty}</p>
          )}
          <p className="text-[9pt] font-mono mt-0.5">
            BMDC Reg. No: <strong>{data.doctorBmdc}</strong>
          </p>
        </div>

        <div className="text-right text-[9pt] leading-snug">
          <p className="font-bold">{data.chamberName}</p>
          {data.chamberAddress && <p>{data.chamberAddress}</p>}
          {data.chamberPhone && (
            <p className="font-mono">
              {tr('Phone: ', 'ফোন: ')}{formatDigits(data.chamberPhone)}
            </p>
          )}
          <p className="font-mono mt-1">
            {tr('Date: ', 'তারিখ: ')}{formatDigits(data.date)}
          </p>
          <p className="font-mono text-[8pt]">Rx No: {data.prescriptionNumber}</p>
        </div>
      </header>

      {/* Patient identification */}
      <section className="no-break grid grid-cols-[1fr_auto_auto] gap-3 py-2 border-b border-black text-[10pt]">
        <div>
          <span className="text-[8.5pt]">{tr('Patient Name: ', 'রোগীর নাম: ')}</span>
          <strong>{data.patientName}</strong>
        </div>
        <div>
          <span className="text-[8.5pt]">{tr('Age: ', 'বয়স: ')}</span>
          <strong>{formatDigits(data.patientAge)}</strong>
        </div>
        <div>
          <span className="text-[8.5pt]">{tr('Sex: ', 'লিঙ্গ: ')}</span>
          <strong>{data.patientGender}</strong>
        </div>
      </section>

      {/* Vitals band */}
      {vitals.length > 0 && (
        <section className="no-break flex flex-wrap gap-x-5 gap-y-1 py-1.5 border-b border-gray-400 text-[9.5pt]">
          {vitals.map(([label, value]) => (
            <span key={label}>
              {label}: <strong className="font-mono">{formatDigits(value)}</strong>
            </span>
          ))}
        </section>
      )}

      {/* Two-column body: clinical notes left, Rx right — standard layout */}
      <div className="grid grid-cols-[34%_1fr] gap-4 pt-3" style={{ minHeight: '180mm' }}>
        <aside className="border-r border-gray-400 pr-3 text-[9.5pt] space-y-3">
          {data.chiefComplaints && (
            <div className="no-break">
              <h2 className="text-[9pt] font-black uppercase border-b border-gray-300 mb-1">
                {tr('C/C — Chief Complaints', 'C/C — রোগীর অভিযোগ')}
              </h2>
              <p className="leading-snug">{data.chiefComplaints}</p>
            </div>
          )}

          <div className="no-break">
            <h2 className="text-[9pt] font-black uppercase border-b border-gray-300 mb-1">
              {tr('Diagnosis', 'Diagnosis — রোগ নির্ণয়')}
            </h2>
            <p className="leading-snug font-semibold">{data.diagnosis}</p>
          </div>

          {data.investigations && data.investigations.length > 0 && (
            <div className="no-break">
              <h2 className="text-[9pt] font-black uppercase border-b border-gray-300 mb-1">
                {tr('Investigations', 'Investigations — পরীক্ষা')}
              </h2>
              <ol className="list-decimal list-inside leading-snug space-y-0.5">
                {data.investigations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
          )}

          {data.advice && data.advice.length > 0 && (
            <div className="no-break">
              <h2 className="text-[9pt] font-black uppercase border-b border-gray-300 mb-1">
                {tr('Advice', 'Advice — পরামর্শ')}
              </h2>
              <ul className="list-disc list-inside leading-snug space-y-0.5">
                {data.advice.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <main>
          <div className="text-[26pt] font-serif font-black italic leading-none mb-2">℞</div>

          <ol className="space-y-2.5">
            {data.medicines.map((medicine, index) => (
              <li key={index} className="rx-row flex gap-2 text-[10.5pt]">
                <span className="font-bold w-5 shrink-0">{formatDigits(index + 1)}.</span>
                <div className="flex-1">
                  <div className="leading-tight">
                    <strong>
                      {medicine.dosageForm}. {medicine.brandName}
                    </strong>
                    <span className="font-mono"> {medicine.strength}</span>
                  </div>
                  <div className="text-[8.5pt] italic text-gray-700 leading-tight">
                    {medicine.genericName}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 mt-0.5 text-[9.5pt]">
                    <span className="font-mono font-bold border border-black px-1.5 rounded">
                      {formatDigits(medicine.dosage)}
                    </span>
                    <span>{medicine.timing}</span>
                    <span>—— {formatDigits(medicine.duration)}</span>
                  </div>
                  {medicine.instructions && (
                    <div className="text-[8.5pt] text-gray-700 leading-tight">
                      ({medicine.instructions})
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </main>
      </div>

      {/* Footer: follow-up, QR verification, signature */}
      <footer className="no-break border-t-2 border-black pt-2 mt-3 flex items-end justify-between gap-4 text-[9pt]">
        <div className="flex items-end gap-3">
          {qrDataUrl && (
            <img src={qrDataUrl} alt="Prescription verification QR code" className="w-[22mm] h-[22mm]" />
          )}
          <div className="leading-snug">
            <p className="font-bold">{tr('Digital Verification', 'ডিজিটাল যাচাই (Digital verification)')}</p>
            <p className="text-[8pt]">{tr('Scan QR to verify prescription authenticity', 'QR স্ক্যান করে প্রেসক্রিপশনের সত্যতা যাচাই করুন')}</p>
            <p className="text-[8pt] font-mono">{data.prescriptionNumber}</p>
            {data.followUp && (
              <p className="text-[9pt] font-bold mt-1">
                {tr('Next Follow-up: ', 'পরবর্তী সাক্ষাৎ: ')}{formatDigits(data.followUp)}
              </p>
            )}
            <p className="text-[8pt]">{tr('Free consultation review within 14 days', '১৪ দিনের মধ্যে রিপোর্ট দেখানো ফ্রি')}</p>
          </div>
        </div>

        <div className="text-center">
          <div className="border-t border-black w-[55mm] pt-1 mt-8">
            <p className="font-bold text-[9.5pt]">{data.doctorName}</p>
            <p className="text-[8pt] font-mono">BMDC: {data.doctorBmdc}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
