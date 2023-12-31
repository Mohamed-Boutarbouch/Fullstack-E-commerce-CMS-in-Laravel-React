interface ColorPreviewProps {
  hexCode: string;
}

export default function ColorPreview({ hexCode }: ColorPreviewProps) {
  return (
    <div
      className="w-8 h-8 rounded-full border-2 border-foreground border-spacing-1"
      style={{ backgroundColor: hexCode }}
    />
  );
}
