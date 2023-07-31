import SettingsForm from '@/components/forms/SettingsForm';

export default function Settings() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm />
      </div>
    </div>
  );
}
