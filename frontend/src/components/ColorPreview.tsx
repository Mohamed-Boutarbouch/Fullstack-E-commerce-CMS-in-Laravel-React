interface ColorPreviewProps {
  hexCode: string;
}

export default function ColorPreview({ hexCode }: ColorPreviewProps) {
  return (
    <div
      className={`w-10 h-10 rounded-full border-2 border-foreground border-spacing-1`}
      style={{ backgroundColor: hexCode }}
    />
  );
}
