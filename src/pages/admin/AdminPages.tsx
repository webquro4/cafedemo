import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Save, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPages = () => {
  const [editingPage, setEditingPage] = useState<string | null>(null);

  const pages = [
    {
      id: "homepage",
      name: "Homepage",
      title: "Exquisite Culinary Experience",
      subtitle: "Where artistry meets flavor in an unforgettable fine dining journey",
      description: "Experience the pinnacle of fine dining with our commitment to excellence, innovative cuisine, and unparalleled hospitality.",
      lastModified: "2024-01-15"
    },
    {
      id: "about",
      name: "About Us",
      title: "Our Story",
      subtitle: "A journey of culinary excellence, passion, and dedication",
      description: "Lumière was born from a simple yet profound vision: to create a dining experience that transcends the ordinary and touches the soul. Our journey began over two decades ago when Chef Marcus Dubois decided to bring his passion for French culinary artistry to New York City.",
      lastModified: "2024-01-12"
    },
    {
      id: "contact",
      name: "Contact",
      title: "Contact Us",
      subtitle: "Get in touch with our team for reservations and inquiries",
      description: "Located in the heart of Manhattan, Lumière is easily accessible by subway, taxi, or car. We're here to make your dining experience exceptional from the moment you contact us.",
      lastModified: "2024-01-10"
    }
  ];

  const [pageData, setPageData] = useState(pages);

  const handleEdit = (pageId: string) => {
    setEditingPage(pageId);
  };

  const handleSave = (pageId: string) => {
    // In a real app, this would save to the backend
    setEditingPage(null);
  };

  const handleCancel = () => {
    setEditingPage(null);
    // Reset changes if needed
  };

  const updatePageData = (pageId: string, field: string, value: string) => {
    setPageData(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, [field]: value }
        : page
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-gold">Page Management</h1>
        <p className="text-muted-foreground">Edit content for your website pages</p>
      </div>

      {/* Pages List */}
      <div className="space-y-6">
        {pageData.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="luxury-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gold">{page.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last modified: {new Date(page.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    {editingPage === page.id ? (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleSave(page.id)}
                          className="bg-gold text-primary-foreground hover:bg-gold-dark"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(page.id)}
                        className="border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingPage === page.id ? (
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${page.id}`}>Page Title</Label>
                        <Input
                          id={`title-${page.id}`}
                          value={page.title}
                          onChange={(e) => updatePageData(page.id, 'title', e.target.value)}
                          className="bg-input border-border focus:border-gold"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`subtitle-${page.id}`}>Subtitle</Label>
                        <Input
                          id={`subtitle-${page.id}`}
                          value={page.subtitle}
                          onChange={(e) => updatePageData(page.id, 'subtitle', e.target.value)}
                          className="bg-input border-border focus:border-gold"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`description-${page.id}`}>Description</Label>
                        <Textarea
                          id={`description-${page.id}`}
                          value={page.description}
                          onChange={(e) => updatePageData(page.id, 'description', e.target.value)}
                          rows={6}
                          className="bg-input border-border focus:border-gold resize-none"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="seo" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label>Meta Title</Label>
                        <Input
                          placeholder="SEO-optimized page title"
                          className="bg-input border-border focus:border-gold"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Meta Description</Label>
                        <Textarea
                          placeholder="Brief description for search engines (max 160 characters)"
                          rows={3}
                          className="bg-input border-border focus:border-gold resize-none"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Keywords</Label>
                        <Input
                          placeholder="Comma-separated keywords"
                          className="bg-input border-border focus:border-gold"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-playfair font-semibold text-lg mb-2">{page.title}</h3>
                      <p className="text-muted-foreground mb-3">{page.subtitle}</p>
                      <p className="text-sm leading-relaxed">{page.description}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bulk Actions */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="text-gold">Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-primary-foreground">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate SEO
            </Button>
            <Button variant="outline">
              Export Content
            </Button>
            <Button variant="outline">
              Import Content
            </Button>
            <Button variant="outline">
              Backup All Pages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPages;