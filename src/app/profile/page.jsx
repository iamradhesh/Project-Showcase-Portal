'use client'
import ProjectList from '@/components/profileComponent/ProjectList'
import UserInfo from '@/components/profileComponent/UserInfo'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { app } from '../../../Shared/firebaseConfig';

const page = () => {
  const {data:session} = useSession();
  
  const db = getFirestore(app);
  const [userProject, setUserProject] = useState([]);


  const getUserProjects = async () => {
    if (!session?.user?.id) return;

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("userId", "==", session.user.id));
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setUserProject(projects);
    console.log("User projects fetched:", projects);
  };

  useEffect(() => {
    getUserProjects();
  }, [session]);

  return (
    <div className='px-10'>
      <UserInfo />
      <ProjectList projects={userProject} setProjects={setUserProject} />

    </div>
  )
}

export default page
