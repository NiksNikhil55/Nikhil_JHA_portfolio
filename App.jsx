import { motion } from "framer-motion";

      {/* Experience */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-semibold mb-6">Experience</h2>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold">Team Lead - CARS24 Dubai</h3>
            <p className="text-gray-400">Jun 2025 – Mar 2026</p>
            <ul className="list-disc ml-5 text-gray-400 mt-2">
              <li>Managed AED 26–30M monthly financing</li>
              <li>Reduced TAT from 13 → 7.8 days</li>
              <li>Built automation workflows</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">Assistant Manager - CARS24 India</h3>
            <p className="text-gray-400">2021 – 2025</p>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {["SQL", "Python", "Google Sheets", "Automation", "Operations"].map(skill => (
            <span key={skill} className="bg-blue-600 px-4 py-2 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <div className="space-y-2 text-gray-400">
          <p className="flex items-center gap-2"><Mail size={16}/> nikhiljha5555@gmail.com</p>
          <p className="flex items-center gap-2"><Phone size={16}/> +91-8168799868</p>
        </div>
      </motion.div>

    </div>
  );
}
