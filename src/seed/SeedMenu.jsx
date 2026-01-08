import { useEffect, useRef } from "react";
import menuData from "../data/menuData";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const SeedMenu = () => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // ✅ stop second run
    hasRun.current = true;

    const seed = async () => {
      for (const section of menuData) {
        for (const item of section.items) {
          await addDoc(collection(db, "menu"), {
            name: item.name,
            price: item.price,
            veg: item.veg,
            category: section.category,
            image: item.image, // local image path / URL
            createdAt: new Date(),
          });
        }
      }
      alert("✅ MENU UPLOADED ONCE");
    };

    seed();
  }, []);

  return <h3>Uploading menu…</h3>;
};

export default SeedMenu;
