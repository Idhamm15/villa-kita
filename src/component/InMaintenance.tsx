import { LucideIcon, Settings } from "lucide-react";

interface InMaintenanceProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

export default function InMaintenance({
  title = "Pengaturan Umum",
  description = "Fitur pengaturan sedang dalam pengembangan. Halaman ini akan memungkinkan Anda mengatur pajak, biaya layanan, dan konfigurasi umum lainnya.",
  icon: Icon = Settings,
}: InMaintenanceProps) {
  return (
    <div className="w-full rounded-2xl border border-[#3b7f8c] bg-[#276874] px-6 py-24 shadow-lg">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="mb-6 rounded-full border border-[#4f93a0] bg-[#1f5661] p-4">
          <Icon className="h-12 w-12 text-emerald-100" strokeWidth={1.5} />
        </div>

        <h2 className="text-3xl font-semibold text-white">
          {title}
        </h2>

        <p className="mt-4 text-base leading-8 text-emerald-100/80">
          {description}
        </p>
      </div>
    </div>
  );
}