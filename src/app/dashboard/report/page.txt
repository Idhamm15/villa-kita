"use client";


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { apiFetch } from "@/lib/api";
import InMaintenance from "@/component/InMaintenance";
import { FileText } from "lucide-react";


interface Blog {
  id: number;
  user_id: number;
  title: string;
  slug: string | null;
  excerpt: string | null;
  body: string;
  thumbnail_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total_data: 0,
    total_pages: 1,
    has_next_page: false,
    has_prev_page: false,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const result = await apiFetch(
        `/blog?page=${page}&limit=10`
      );

      if (result.status) {
        setBlogs(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* Sidebar */}
      <HeaderDashboard
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">

        {/* Header */}
        <NavbarDashboard
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <div className="bg-gray-100 rounded-3xl p-6">
          
        <InMaintenance
          icon={FileText}
          title="Pengaturan Umum"
          description="Fitur pengaturan sedang dalam pengembangan."
        />

        </div>
      </main>
    </div>
  );
}