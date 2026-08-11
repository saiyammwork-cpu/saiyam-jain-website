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

export const defaultFreeCourse = {
  id: 'crs-free-webdev-101',
  title: 'Learn How to make websites for FREE',
  instructor: 'Saiyam Jain',
  price: 0,
  badge: 'Free Masterclass',
  description: 'Master free domain claiming, WordPress & AI website builders, and step-by-step web publishing by Saiyam Jain.',
  link: 'https://youtu.be/WHZK2U4MMv8?si=--G3FGX05nuZeuvz',
  status: 'Published'
};

// Initial Cloud Database State Template
const initialMasterState = {
  courses: [defaultFreeCourse],
  orders: [],
  coupons: [{ code: 'SAIYAM10', discount: 10, type: 'percentage', status: 'Active' }],
  inquiries: [],
  pricing: {
    basicPrice: 4999,
    standardPrice: 8999,
    premiumPrice: 11999,
    lmsBasicPrice: 9999,
    lmsStandardPrice: 10999,
    lmsPremiumPrice: 14999,
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
      if (dbData.courses.length === 0) {
        callback([defaultFreeCourse]);
      } else {
        const hasFreeCourse = dbData.courses.some(c => c.id === defaultFreeCourse.id || c.title.toLowerCase().includes('learn how to make websites for free'));
        callback(hasFreeCourse ? dbData.courses : [defaultFreeCourse, ...dbData.courses]);
      }
    } else {
      callback([defaultFreeCourse]);
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
   2. ORDERS & TRANSACTIONS MANAGER
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
  await updateCloudDB((dbState) => {
    const orders = dbState.orders || [];
    return {
      ...dbState,
      orders: [orderData, ...orders]
    };
  });
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
   3. COUPON MANAGER
   ========================================================================== */

export const subscribeCoupons = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.coupons) {
      callback(dbData.coupons);
    } else {
      callback(initialMasterState.coupons);
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
    const exists = coupons.some(c => c.code.toUpperCase() === couponData.code.toUpperCase());
    const nextCoupons = exists
      ? coupons.map(c => c.code.toUpperCase() === couponData.code.toUpperCase() ? couponData : c)
      : [...coupons, couponData];
    return {
      ...dbState,
      coupons: nextCoupons
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
   4. FORM INQUIRIES MANAGER
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
      inquiries: [inquiryData, ...inquiries]
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
   5. PRICING & MEDIA MANAGER
   ========================================================================== */

export const subscribePricing = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.pricing) {
      callback({
        ...initialMasterState.pricing,
        ...dbData.pricing
      });
    } else {
      callback(initialMasterState.pricing);
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

export const savePricingToCloud = async (newPricing) => {
  await updateCloudDB((dbState) => ({
    ...dbState,
    pricing: newPricing
  }));
};

export const subscribeMediaLinks = (callback) => {
  let isSubscribed = true;

  const poll = async () => {
    if (!isSubscribed) return;
    const dbData = await fetchCloudDB();
    if (dbData && dbData.media) {
      callback(dbData.media);
    } else {
      callback(initialMasterState.media);
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

export const saveMediaLinksToCloud = async (newMedia) => {
  await updateCloudDB((dbState) => ({
    ...dbState,
    media: newMedia
  }));
};
