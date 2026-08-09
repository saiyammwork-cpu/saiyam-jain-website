import { 
  db, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, 
  onSnapshot, query, orderBy, getDocs 
} from '../lib/firebase';

// BroadcastChannel for instant cross-tab / cross-window sync in same browser environment
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('saiyam_cloud_db_sync')
  : null;

// Helper to notify local subscribers & broadcast channel
const notifySync = (type, payload) => {
  if (syncChannel) {
    try {
      syncChannel.postMessage({ type, payload, timestamp: Date.now() });
    } catch (e) {
      console.warn("Broadcast channel sync failed:", e);
    }
  }
};

/* ==========================================================================
   1. COURSES MANAGER (ADMIN WRITE ➔ DB ➔ CONSUMER/STUDENT READ)
   ========================================================================== */

export const subscribeCourses = (callback) => {
  try {
    const q = query(collection(db, 'courses'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      // Fallback merge with localStorage cache if Firestore collection is initializing
      const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
      const finalCourses = items.length > 0 ? items : cache;
      localStorage.setItem('saiyam_courses_cloud', JSON.stringify(finalCourses));
      callback(finalCourses);
    }, (error) => {
      console.warn("Firestore courses subscription fallback:", error);
      const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
      callback(cache);
    });

    if (syncChannel) {
      syncChannel.onmessage = (event) => {
        if (event.data?.type === 'COURSES_UPDATED') {
          const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
          callback(cache);
        }
      };
    }

    return unsubscribe;
  } catch (err) {
    const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
    callback(cache);
    return () => {};
  }
};

export const addCourseToCloud = async (courseData) => {
  try {
    const docRef = await addDoc(collection(db, 'courses'), {
      ...courseData,
      createdAt: new Date().toISOString(),
      status: courseData.status || 'Published'
    });
    const newCourse = { id: docRef.id, ...courseData };
    
    // Update local cache & broadcast
    const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
    const updated = [newCourse, ...cache.filter(c => c.id !== docRef.id)];
    localStorage.setItem('saiyam_courses_cloud', JSON.stringify(updated));
    notifySync('COURSES_UPDATED', updated);
    return newCourse;
  } catch (err) {
    console.warn("Writing course to cloud db:", err);
    const newCourse = { id: 'CRS-' + Date.now(), ...courseData };
    const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
    const updated = [newCourse, ...cache];
    localStorage.setItem('saiyam_courses_cloud', JSON.stringify(updated));
    notifySync('COURSES_UPDATED', updated);
    return newCourse;
  }
};

export const toggleCourseStatusInCloud = async (courseId, currentStatus) => {
  const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
  try {
    const docRef = doc(db, 'courses', courseId);
    await updateDoc(docRef, { status: newStatus });
  } catch (err) {
    console.warn("Cloud course status update:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
  const updated = cache.map(c => c.id === courseId ? { ...c, status: newStatus } : c);
  localStorage.setItem('saiyam_courses_cloud', JSON.stringify(updated));
  notifySync('COURSES_UPDATED', updated);
};

export const deleteCourseFromCloud = async (courseId) => {
  try {
    await deleteDoc(doc(db, 'courses', courseId));
  } catch (err) {
    console.warn("Cloud course deletion:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_courses_cloud') || '[]');
  const updated = cache.filter(c => c.id !== courseId);
  localStorage.setItem('saiyam_courses_cloud', JSON.stringify(updated));
  notifySync('COURSES_UPDATED', updated);
};


/* ==========================================================================
   2. LIVE ORDERS (BUYER WRITE ➔ DB ➔ ADMIN READ)
   ========================================================================== */

export const subscribeOrders = (callback) => {
  try {
    const q = query(collection(db, 'orders'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
      const finalOrders = items.length > 0 ? items : cache;
      localStorage.setItem('saiyam_orders_cloud', JSON.stringify(finalOrders));
      callback(finalOrders);
    }, (error) => {
      console.warn("Firestore orders subscription fallback:", error);
      const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
      callback(cache);
    });

    if (syncChannel) {
      syncChannel.onmessage = (event) => {
        if (event.data?.type === 'ORDERS_UPDATED') {
          const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
          callback(cache);
        }
      };
    }

    return unsubscribe;
  } catch (err) {
    const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
    callback(cache);
    return () => {};
  }
};

export const createOrderInCloud = async (orderData) => {
  try {
    const docRef = doc(db, 'orders', orderData.id);
    await setDoc(docRef, {
      ...orderData,
      createdAt: new Date().toISOString()
    });
    
    const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
    const updated = [orderData, ...cache.filter(o => o.id !== orderData.id)];
    localStorage.setItem('saiyam_orders_cloud', JSON.stringify(updated));
    notifySync('ORDERS_UPDATED', updated);
    return orderData;
  } catch (err) {
    console.warn("Creating order in cloud db:", err);
    const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
    const updated = [orderData, ...cache.filter(o => o.id !== orderData.id)];
    localStorage.setItem('saiyam_orders_cloud', JSON.stringify(updated));
    notifySync('ORDERS_UPDATED', updated);
    return orderData;
  }
};

export const updateOrderStageInCloud = async (orderId, newStage) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, { stage: newStage });
  } catch (err) {
    console.warn("Cloud order stage update:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
  const updated = cache.map(o => o.id === orderId ? { ...o, stage: newStage } : o);
  localStorage.setItem('saiyam_orders_cloud', JSON.stringify(updated));
  notifySync('ORDERS_UPDATED', updated);
};

export const deleteOrderFromCloud = async (orderId) => {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (err) {
    console.warn("Cloud order deletion:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_orders_cloud') || '[]');
  const updated = cache.filter(o => o.id !== orderId);
  localStorage.setItem('saiyam_orders_cloud', JSON.stringify(updated));
  notifySync('ORDERS_UPDATED', updated);
};


/* ==========================================================================
   3. COUPONS MANAGER (ADMIN WRITE ➔ DB ➔ CHECKOUT READ)
   ========================================================================== */

export const subscribeCoupons = (callback) => {
  const defaultCoupons = [{ code: 'SAIYAM10', discount: 10, type: 'percentage', status: 'Active' }];
  try {
    const q = query(collection(db, 'coupons'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      const cache = JSON.parse(localStorage.getItem('saiyam_coupons_cloud') || 'null') || defaultCoupons;
      const finalCoupons = items.length > 0 ? items : cache;
      localStorage.setItem('saiyam_coupons_cloud', JSON.stringify(finalCoupons));
      callback(finalCoupons);
    }, (error) => {
      const cache = JSON.parse(localStorage.getItem('saiyam_coupons_cloud') || 'null') || defaultCoupons;
      callback(cache);
    });

    return unsubscribe;
  } catch (err) {
    const cache = JSON.parse(localStorage.getItem('saiyam_coupons_cloud') || 'null') || defaultCoupons;
    callback(cache);
    return () => {};
  }
};

export const saveCouponToCloud = async (couponData) => {
  try {
    const docRef = doc(db, 'coupons', couponData.code);
    await setDoc(docRef, {
      ...couponData,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Cloud coupon save:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_coupons_cloud') || '[]');
  const updated = [...cache.filter(c => c.code !== couponData.code), couponData];
  localStorage.setItem('saiyam_coupons_cloud', JSON.stringify(updated));
  notifySync('COUPONS_UPDATED', updated);
};

export const toggleCouponStatusInCloud = async (code, currentStatus) => {
  const newStatus = currentStatus === 'Active' ? 'Disabled' : 'Active';
  try {
    const docRef = doc(db, 'coupons', code);
    await updateDoc(docRef, { status: newStatus });
  } catch (err) {
    console.warn("Cloud coupon toggle:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_coupons_cloud') || '[]');
  const updated = cache.map(c => c.code === code ? { ...c, status: newStatus } : c);
  localStorage.setItem('saiyam_coupons_cloud', JSON.stringify(updated));
  notifySync('COUPONS_UPDATED', updated);
};

export const deleteCouponFromCloud = async (code) => {
  try {
    await deleteDoc(doc(db, 'coupons', code));
  } catch (err) {
    console.warn("Cloud coupon deletion:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_coupons_cloud') || '[]');
  const updated = cache.filter(c => c.code !== code);
  localStorage.setItem('saiyam_coupons_cloud', JSON.stringify(updated));
  notifySync('COUPONS_UPDATED', updated);
};


/* ==========================================================================
   4. FORM INQUIRIES (CONSUMER WRITE ➔ DB ➔ ADMIN READ)
   ========================================================================== */

export const subscribeInquiries = (callback) => {
  try {
    const q = query(collection(db, 'inquiries'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      const cache = JSON.parse(localStorage.getItem('saiyam_inquiries_cloud') || '[]');
      const finalInquiries = items.length > 0 ? items : cache;
      localStorage.setItem('saiyam_inquiries_cloud', JSON.stringify(finalInquiries));
      callback(finalInquiries);
    }, (error) => {
      const cache = JSON.parse(localStorage.getItem('saiyam_inquiries_cloud') || '[]');
      callback(cache);
    });

    return unsubscribe;
  } catch (err) {
    const cache = JSON.parse(localStorage.getItem('saiyam_inquiries_cloud') || '[]');
    callback(cache);
    return () => {};
  }
};

export const createInquiryInCloud = async (inquiryData) => {
  try {
    const docRef = doc(db, 'inquiries', inquiryData.id);
    await setDoc(docRef, {
      ...inquiryData,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Cloud inquiry create:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_inquiries_cloud') || '[]');
  const updated = [inquiryData, ...cache.filter(i => i.id !== inquiryData.id)];
  localStorage.setItem('saiyam_inquiries_cloud', JSON.stringify(updated));
  notifySync('INQUIRIES_UPDATED', updated);
};

export const deleteInquiryFromCloud = async (inquiryId) => {
  try {
    await deleteDoc(doc(db, 'inquiries', inquiryId));
  } catch (err) {
    console.warn("Cloud inquiry delete:", err);
  }
  const cache = JSON.parse(localStorage.getItem('saiyam_inquiries_cloud') || '[]');
  const updated = cache.filter(i => i.id !== inquiryId);
  localStorage.setItem('saiyam_inquiries_cloud', JSON.stringify(updated));
  notifySync('INQUIRIES_UPDATED', updated);
};


/* ==========================================================================
   5. PRICING MANAGER (ADMIN WRITE ➔ DB ➔ SERVICES READ)
   ========================================================================== */

export const subscribePricing = (callback) => {
  const defaultPricing = {
    basicPrice: 4999,
    standardPrice: 8999,
    premiumPrice: 11999,
    videoAdsBase: 1999,
    videoAdsExtra: 799,
    imageAdsBase: 699,
    imageAdsExtra: 149
  };

  try {
    const docRef = doc(db, 'settings', 'global_pricing');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        localStorage.setItem('saiyam_pricing_cloud', JSON.stringify(data));
        callback(data);
      } else {
        const cache = JSON.parse(localStorage.getItem('saiyam_pricing_cloud') || 'null') || defaultPricing;
        callback(cache);
      }
    }, (err) => {
      const cache = JSON.parse(localStorage.getItem('saiyam_pricing_cloud') || 'null') || defaultPricing;
      callback(cache);
    });

    return unsubscribe;
  } catch (err) {
    const cache = JSON.parse(localStorage.getItem('saiyam_pricing_cloud') || 'null') || defaultPricing;
    callback(cache);
    return () => {};
  }
};

export const savePricingToCloud = async (pricingData) => {
  try {
    const docRef = doc(db, 'settings', 'global_pricing');
    await setDoc(docRef, {
      ...pricingData,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Cloud pricing save:", err);
  }
  localStorage.setItem('saiyam_pricing_cloud', JSON.stringify(pricingData));
  notifySync('PRICING_UPDATED', pricingData);
};


/* ==========================================================================
   6. MEDIA & SYSTEM LINKS MANAGER (ADMIN WRITE ➔ DB ➔ CONSUMER READ)
   ========================================================================== */

export const subscribeMediaLinks = (callback) => {
  const defaultMedia = {
    upiId: 'BHARATPE09910636684@yesbankltd',
    whatsappPhone: '+91 9339256592',
    canaraAc: '110265163648',
    canaraIfsc: 'CNRB0001426',
    ytShorts: 'https://youtube.com/shorts/kQaWu8FIlls?si=fcy-YmBsZkMzfI4D',
    instagram: 'https://instagram.com/saiyam.io'
  };

  try {
    const docRef = doc(db, 'settings', 'global_media');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        localStorage.setItem('saiyam_media_cloud', JSON.stringify(data));
        callback(data);
      } else {
        const cache = JSON.parse(localStorage.getItem('saiyam_media_cloud') || 'null') || defaultMedia;
        callback(cache);
      }
    }, (err) => {
      const cache = JSON.parse(localStorage.getItem('saiyam_media_cloud') || 'null') || defaultMedia;
      callback(cache);
    });

    return unsubscribe;
  } catch (err) {
    const cache = JSON.parse(localStorage.getItem('saiyam_media_cloud') || 'null') || defaultMedia;
    callback(cache);
    return () => {};
  }
};

export const saveMediaLinksToCloud = async (mediaData) => {
  try {
    const docRef = doc(db, 'settings', 'global_media');
    await setDoc(docRef, {
      ...mediaData,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Cloud media links save:", err);
  }
  localStorage.setItem('saiyam_media_cloud', JSON.stringify(mediaData));
  notifySync('MEDIA_UPDATED', mediaData);
};
