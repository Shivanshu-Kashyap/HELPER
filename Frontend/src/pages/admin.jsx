import { useEffect, useState } from "react";
import { SearchIcon, Edit2Icon, SaveIcon, XIcon, UserIcon, ShieldIcon, CodeIcon, Loader2 } from "lucide-react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role,
      skills: user.skills?.join(", "),
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: editingUser,
            role: formData.role,
            skills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error || "Failed to update user");
        return;
      }

      setEditingUser(null);
      setFormData({ role: "", skills: "" });
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "moderator":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      default:
        return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-zinc-400 text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900/20 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">User Management</h1>
            <p className="text-zinc-400">Manage user roles and permissions</p>
          </div>

          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{user.email}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {user.skills && user.skills.length > 0 && (
                    <div className="flex items-start space-x-3 pl-16">
                      <CodeIcon className="w-5 h-5 text-zinc-500 mt-1" />
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs border border-zinc-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:w-96">
                  {editingUser === user.email ? (
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-white/5 space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Role</label>
                        <select
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none text-sm"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Skills</label>
                        <input
                          type="text"
                          placeholder="React, Node.js..."
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:border-orange-500 focus:outline-none text-sm"
                          value={formData.skills}
                          onChange={(e) =>
                            setFormData({ ...formData, skills: e.target.value })
                          }
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          className="flex-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          onClick={handleUpdate}
                        >
                          <SaveIcon className="w-4 h-4" /> Save
                        </button>
                        <button
                          className="flex-1 bg-zinc-700/30 text-zinc-400 hover:bg-zinc-700/50 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          onClick={() => setEditingUser(null)}
                        >
                          <XIcon className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end h-full items-center">
                      <button
                        className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 border border-zinc-700"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit2Icon className="w-4 h-4" /> Edit User
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}