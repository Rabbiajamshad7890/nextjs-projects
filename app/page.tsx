import BlogsSection from '@/components/BlogsSection'
import { ClientMarqueeSection } from '@/components/ClientSection'
import CommunitySection from '@/components/CommunitySection'
import  CourseSection from '@/components/CourseSection'


import DocumentationSection from '@/components/DocumentationSection'
import HeroSection from '@/components/HeroSection'
import P2PCloudCTABannerOriginal from '@/components/P2PCloudCTABannerOriginal'
import ProductSection from '@/components/ProductSection'

import React from 'react'

export default function page() {
  return (
    <div> 
      
      <HeroSection />
      <CourseSection />
      <ProductSection />
      <CommunitySection />
      <DocumentationSection />
      <BlogsSection />
      <ClientMarqueeSection/>
      <P2PCloudCTABannerOriginal />
    </div>
  )
}
