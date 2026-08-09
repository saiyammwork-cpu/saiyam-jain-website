import { db, collection, doc, onSnapshot } from '../lib/firebase';

// Primary Production Master Cloud Database Endpoint
const CLOUD_DB_URL = import.meta.env.VITE_CLOUD_DB_URL || 'https://jsonblob.com/api/jsonBlob/019fe430-a466-751a-9448-105d77d4c7dd';

// BroadcastChannel for instant cross-tab sync in same browser engine
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('saiyam_production_cloud_db_v2')
  : null;

const notifyLocal = (type, payload) => {
  if (syncChannel) {
    try {
      syncChannel.postMessage({ type, payload, timestamp: Date.now() });
    } catch (e) {
      console.warn("Broadcast error:", e);
    }
  }
};

// Initial Cloud Database State Template
const initialMasterState = {
  courses: [],
  orders: [],
  coupons: [{ code: 'SAIYAM10', discount: 10, type: 'percentage', status: 'Active' }],
  inquiries: [],
  pricing: {
    basicPrice: 4999,
    standardPrice: 8999,
    premiumPrice: 11999,
    videoAdsBase: 1999,
    videoAdsExtra: 799,
    imageAdsBase: 699,
    imageAdsExtra: 149
  },
  media: {
    upiId: 'BHARATPE09910636684@yesbankltd',
    whatsappPhone: '+91 9339256592',
    canaraAc: '110265163648',
    canaraIfsc: 'CNRB0001426',
    ytShorts: 'https://youtube.com/shorts/kQaWu8FIlls?si=fcy-YmBsZkMzfI4D',
    instagram: 'https://instagram.com/saiyam.io'
  }
};

// Core REST Cloud Persistence Functions
export const fetchCloudDB = async () => {
  try {
    const res = await fetch(CLOUD_DB_URL, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Cloud DB HTTP status ${res.status}`);
    const data = await res.json();
    return data && typeof data === 'object' ? data : initialMasterState;
  } catch (err) {
    console.warn("Primary Cloud DB fetch warning, reading cache:", err);
    const cached = localStorage.getItem('saiyam_master_cloud_cache');
    return cached ? JSON.parse(cached) : initialMasterState;
  }
};

export const updateCloudDB = async (mutationFn) => {
  try {
    const current = await fetchCloudDB();
    const nextState = mutationFn(current);

    // Save to local cache immediately
    localStorage.setItem('saiyam_master_cloud_cache', JSON.stringify(nextState));

    const res = await fetch(CLOUD_DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(nextState)
    });

    notifyLocal('DB_UPDATED', nextState);
    return res.ok;
  } catch (err) {
    console.error("Cloud DB write error:", err);
    return false;
  }
};


/* ==========================================================================
   1. COURSES MANAGER (ADMIN WRITE ➔ PRODUCTION DB ➔ CONSUMER READ)
   ========================================================================== */

export const subscribeCourses = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.courses) {
      callback(dbData.courses);
    }
  };

  poll();
  const interval = setInterval(poll, 2000);

  if (syncChannel) {
    syncChannel.onmessage = () => poll();
  }

  return () => {
    isSubscribed = false;
    clearInterval(interval);
  };
};

export const addCourseToCloud = async (courseData) => {
  const newCourse = {
    id: 'CRS-' + Math.floor(100000 + Math.random() * 900000),
    ...courseData,
    status: courseData.status || 'Published',
    createdAt: new Date().toISOString()
  };

  await updateCloudDB((dbState) => {
    const courses = dbState.courses || [];
    return {
      ...dbState,
      courses: [newCourse, ...courses.filter(c => c.id !== newCourse.id)]
    };
  });

  return newCourse;
};

export const toggleCourseStatusInCloud = async (courseId, currentStatus) => {
  const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
  await updateCloudDB((dbState) => {
    const courses = dbState.courses || [];
    return {
      ...dbState,
      courses: courses.map(c => c.id === courseId ? { ...c, status: newStatus } : c)
    };
  });
};

export const deleteCourseFromCloud = async (courseId) => {
  await updateCloudDB((dbState) => {
    const courses = dbState.courses || [];
    return {
      ...dbState,
      courses: courses.filter(c => c.id !== courseId)
    };
  });
};


/* ==========================================================================
   2. LIVE ORDERS (BUYER WRITE ➔ PRODUCTION DB ➔ ADMIN READ)
   ========================================================================== */

export const subscribeOrders = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.orders) {
      callback(dbData.orders);
    }
  };

  poll();
  const interval = setInterval(poll, 2000);

  if (syncChannel) {
    syncChannel.onmessage = () => poll();
  }

  return () => {
    isSubscribed = false;
    clearInterval(interval);
  };
};

export const createOrderInCloud = async (orderData) => {
  const orderObj = {
    ...orderData,
    createdAt: new Date().toISOString()
  };

  await updateCloudDB((dbState) => {
    const orders = dbState.orders || [];
    return {
      ...dbState,
      orders: [orderObj, ...orders.filter(o => o.id !== orderObj.id)]
    };
  });

  return orderObj;
};

export const updateOrderStageInCloud = async (orderId, newStage) => {
  await updateCloudDB((dbState) => {
    const orders = dbState.orders || [];
    return {
      ...dbState,
      orders: orders.map(o => o.id === orderId ? { ...o, stage: newStage } : o)
    };
  });
};

export const deleteOrderFromCloud = async (orderId) => {
  await updateCloudDB((dbState) => {
    const orders = dbState.orders || [];
    return {
      ...dbState,
      orders: orders.filter(o => o.id !== orderId)
    };
  });
};


/* ==========================================================================
   3. COUPON MANAGER (ADMIN WRITE ➔ PRODUCTION DB ➔ CHECKOUT READ)
   ========================================================================== */

export const subscribeCoupons = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.coupons) {
      callback(dbData.coupons);
    }
  };

  poll();
  const interval = setInterval(poll, 2000);

  if (syncChannel) {
    syncChannel.onmessage = () => poll();
  }

  return () => {
    isSubscribed = false;
    clearInterval(interval);
  };
};

export const saveCouponToCloud = async (couponData) => {
  await updateCloudDB((dbState) => {
    const coupons = dbState.coupons || [];
    return {
      ...dbState,
      coupons: [...coupons.filter(c => c.code !== couponData.code), couponData]
    };
  });
};

export const toggleCouponStatusInCloud = async (code, currentStatus) => {
  const newStatus = currentStatus === 'Active' ? 'Disabled' : 'Active';
  await updateCloudDB((dbState) => {
    const coupons = dbState.coupons || [];
    return {
      ...dbState,
      coupons: coupons.map(c => c.code === code ? { ...c, status: newStatus } : c)
    };
  });
};

export const deleteCouponFromCloud = async (code) => {
  await updateCloudDB((dbState) => {
    const coupons = dbState.coupons || [];
    return {
      ...dbState,
      coupons: coupons.filter(c => c.code !== code)
    };
  });
};


/* ==========================================================================
   4. FORM INQUIRIES (CONSUMER WRITE ➔ PRODUCTION DB ➔ ADMIN READ)
   ========================================================================== */

export const subscribeInquiries = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.inquiries) {
      callback(dbData.inquiries);
    }
  };

  poll();
  const interval = setInterval(poll, 2000);

  if (syncChannel) {
    syncChannel.onmessage = () => poll();
  }

  return () => {
    isSubscribed = false;
    clearInterval(interval);
  };
};

export const createInquiryInCloud = async (inquiryData) => {
  await updateCloudDB((dbState) => {
    const inquiries = dbState.inquiries || [];
    return {
      ...dbState,
      inquiries: [inquiryData, ...inquiries.filter(i => i.id !== inquiryData.id)]
    };
  });
};

export const deleteInquiryFromCloud = async (inquiryId) => {
  await updateCloudDB((dbState) => {
    const inquiries = dbState.inquiries || [];
    return {
      ...dbState,
      inquiries: inquiries.filter(i => i.id !== inquiryId)
    };
  });
};


/* ==========================================================================
   5. PRICING MANAGER (ADMIN WRITE ➔ PRODUCTION DB ➔ SERVICES READ)
   ========================================================================== */

export const subscribePricing = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.pricing) {
      callback(dbData.pricing);
    }
  };

  poll();
  const interval = setInterval(poll, 2000);

  if (syncChannel) {
    syncChannel.onmessage = () => poll();
  }

  return () => {
    isSubscribed = false;
    clearInterval(interval);
  };
};

export const savePricingToCloud = async (pricingData) => {
  await updateCloudDB((dbState) => {
    return {
      ...dbState,
      pricing: pricingData
    };
  });
};


/* ==========================================================================
   6. MEDIA & SYSTEM LINKS MANAGER (ADMIN WRITE ➔ PRODUCTION DB ➔ CONSUMER READ)
   ========================================================================== */

export const subscribeMediaLinks = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.media) {
      callback(dbData.media);
    }
  };

  poll();
  const interval = setInterval(poll, 2000);

  if (syncChannel) {
    syncChannel.onmessage = () => poll();
  }

  return () => {
    isSubscribed = false;
    clearInterval(interval);
  };
};

export const saveMediaLinksToCloud = async (mediaData) => {
  await updateCloudDB((dbState) => {
    return {
      ...dbState,
      media: mediaData
    };
  });
};
