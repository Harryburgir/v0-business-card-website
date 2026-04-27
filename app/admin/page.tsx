"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Package, 
  Plus, 
  ArrowLeft, 
  Edit2, 
  Trash2, 
  Search,
  LayoutGrid,
  List,
  Filter,
  ChevronDown,
  X,
  AlertCircle,
  Check,
  Upload,
  ImageIcon,
  Minus,
  RefreshCw,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { categories, ladebebeCategories, type Product } from "@/lib/products-data";
import { useStock } from "@/context/stock-context";
import { useProducts, type ExtendedProduct } from "@/context/products-context";

// Combine all categories for selection
const allCategories = [
  ...categories.map(c => ({ slug: c.slug, title: c.title, type: "mini" as const })),
  ...ladebebeCategories.map(c => ({ slug: c.slug, title: c.title, type: "ladebebe" as const })),
];

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, isLoaded } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { initializeStock } = useStock();

  // Initialize stock on mount
  useEffect(() => {
    if (isLoaded) {
      const stockData = products.reduce((acc, product) => {
        acc[product.id] = product.stock;
        return acc;
      }, {} as Record<string, number>);
      initializeStock(stockData);
    }
  }, [products, initializeStock, isLoaded]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "40",
    category: "",
    image: "",
    sizes: [] as string[],
  });

  const availableSizes = ["56", "62", "74", "80", "86", "92", "98", "104", "110", "116"];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group products by category for category view
  const productsByCategory = allCategories.reduce((acc, cat) => {
    acc[cat.slug] = products.filter(p => p.category === cat.slug);
    return acc;
  }, {} as Record<string, ExtendedProduct[]>);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      stock: "40",
      category: "",
      image: "",
      sizes: [],
    });
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleAddProduct = () => {
    if (!formData.title || !formData.price || !formData.category) return;

    const newProduct: ExtendedProduct = {
      id: `product-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock) || 40,
      category: formData.category,
      image: formData.image || "/images/placeholder.jpg",
      sizes: formData.sizes.length > 0 ? formData.sizes : undefined,
    };

    addProduct(newProduct);
    
    // Add stock to context
    initializeStock({ [newProduct.id]: parseInt(formData.stock) || 40 });

    setIsAddDialogOpen(false);
    resetForm();
    showSuccess("Produkt dodany pomyslnie");
  };

  const handleEditProduct = () => {
    if (!selectedProduct || !formData.title || !formData.price || !formData.category) return;

    updateProduct(selectedProduct.id, {
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock) || 0,
      category: formData.category,
      image: formData.image || selectedProduct.image,
      sizes: formData.sizes.length > 0 ? formData.sizes : undefined,
    });

    // Update stock in context
    initializeStock({ [selectedProduct.id]: parseInt(formData.stock) || 0 });

    setIsEditDialogOpen(false);
    setSelectedProduct(null);
    resetForm();
    showSuccess("Produkt zaktualizowany");
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    deleteProduct(selectedProduct.id);
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
    showSuccess("Produkt usuniety");
  };

  const openEditDialog = (product: ExtendedProduct) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      image: product.image,
      sizes: product.sizes || [],
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: ExtendedProduct) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const getCategoryTitle = (slug: string) => {
    return allCategories.find(c => c.slug === slug)?.title || slug;
  };

  const stats = {
    totalProducts: products.length,
    totalCategories: allCategories.length,
    lowStock: products.filter(p => p.stock < 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-lg">
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Powrot do sklepu</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Panel Administracyjny</h1>
            </div>
          </div>
          <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Dodaj produkt</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Produkty</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Package className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Kategorie</p>
                  <p className="text-2xl font-bold">{stats.totalCategories}</p>
                </div>
                <div className="rounded-full bg-secondary p-3">
                  <LayoutGrid className="h-5 w-5 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Niski stan</p>
                  <p className="text-2xl font-bold">{stats.lowStock}</p>
                </div>
                <div className="rounded-full bg-destructive/10 p-3">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wartosc magazynu</p>
                  <p className="text-2xl font-bold">{stats.totalValue.toLocaleString("pl-PL")} zl</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Package className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all">Wszystkie produkty</TabsTrigger>
              <TabsTrigger value="categories">Wedlug kategorii</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Szukaj produktow..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Kategoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  {allCategories.map(cat => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex rounded-lg border border-border">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* All Products View */}
          <TabsContent value="all" className="space-y-4">
            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-medium">Brak produktow</p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? "Nie znaleziono produktow pasujacych do wyszukiwania" : "Dodaj pierwszy produkt"}
                  </p>
                </CardContent>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryTitle={getCategoryTitle(product.category)}
                    onEdit={() => openEditDialog(product)}
                    onDelete={() => openDeleteDialog(product)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {filteredProducts.map(product => (
                      <ProductListItem
                        key={product.id}
                        product={product}
                        categoryTitle={getCategoryTitle(product.category)}
                        onEdit={() => openEditDialog(product)}
                        onDelete={() => openDeleteDialog(product)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Category View */}
          <TabsContent value="categories" className="space-y-6">
            {allCategories.map(category => {
              const categoryProducts = productsByCategory[category.slug] || [];
              if (categoryProducts.length === 0 && selectedCategory !== "all" && selectedCategory !== category.slug) {
                return null;
              }
              return (
                <Card key={category.slug}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {category.title}
                          <Badge variant="secondary" className="ml-2">
                            {categoryProducts.length} {categoryProducts.length === 1 ? "produkt" : "produktow"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {category.type === "ladebebe" ? "Kolekcja La de Bebe (2-6 lat)" : "Kolekcja La de Bebe mini (0-1 rok)"}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          resetForm();
                          setFormData(prev => ({ ...prev, category: category.slug }));
                          setIsAddDialogOpen(true);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Dodaj do kategorii
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {categoryProducts.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Package className="mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Brak produktow w tej kategorii</p>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categoryProducts.map(product => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            categoryTitle={category.title}
                            onEdit={() => openEditDialog(product)}
                            onDelete={() => openDeleteDialog(product)}
                            compact
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Dodaj nowy produkt
            </DialogTitle>
            <DialogDescription>
              Wypelnij dane nowego produktu. Pola oznaczone * sa wymagane.
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            availableSizes={availableSizes}
            toggleSize={toggleSize}
            allCategories={allCategories}
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Anuluj
            </Button>
            <Button 
              onClick={handleAddProduct}
              disabled={!formData.title.trim() || formData.price === "" || !formData.category}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Dodaj produkt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-primary" />
              Edytuj produkt
            </DialogTitle>
            <DialogDescription>
              Zaktualizuj dane produktu. Zmiany zostana zapisane natychmiast.
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            availableSizes={availableSizes}
            toggleSize={toggleSize}
            allCategories={allCategories}
            isEditing
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Anuluj
            </Button>
            <Button 
              onClick={handleEditProduct}
              disabled={!formData.title.trim() || formData.price === "" || !formData.category}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Zapisz zmiany
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunac ten produkt?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedProduct && (
                <>
                  Produkt &quot;{selectedProduct.title}&quot; zostanie trwale usuniety. 
                  Tej operacji nie mozna cofnac.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Usun produkt
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Product Form Component
interface ProductFormProps {
  formData: {
    title: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    image: string;
    sizes: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<ProductFormProps["formData"]>>;
  availableSizes: string[];
  toggleSize: (size: string) => void;
  allCategories: { slug: string; title: string; type: "mini" | "ladebebe" }[];
  isEditing?: boolean;
}

function ProductForm({ formData, setFormData, availableSizes, toggleSize, allCategories, isEditing }: ProductFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionMaxLength = 500;
  const stockValue = parseInt(formData.stock) || 0;
  const isLowStock = stockValue < 10;
  const isOutOfStock = stockValue === 0;

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData(prev => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const adjustStock = (amount: number) => {
    const newValue = Math.max(0, stockValue + amount);
    setFormData(prev => ({ ...prev, stock: newValue.toString() }));
  };

  return (
    <div className="grid gap-6 py-4">
      {/* Image Upload Section */}
      <div className="grid gap-3">
        <Label className="flex items-center justify-between">
          <span>Zdjecie produktu</span>
          {formData.image && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 text-xs"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-3.5 w-3.5" />
              {showPreview ? "Ukryj" : "Podglad"}
            </Button>
          )}
        </Label>
        
        {/* Image Preview */}
        {showPreview && formData.image && (
          <div className="relative aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={formData.image}
              alt="Podglad produktu"
              fill
              className="object-cover"
            />
          </div>
        )}
        
        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : formData.image
              ? "border-primary/50 bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {formData.image ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Zdjecie dodane</p>
              <p className="text-xs text-muted-foreground">Kliknij lub przeciagnij aby zmienic</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Przeciagnij zdjecie lub kliknij</p>
              <p className="text-xs text-muted-foreground">PNG, JPG do 5MB</p>
            </div>
          )}
        </div>
        
        {/* URL Input Alternative */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">lub podaj URL</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <Input
          placeholder="https://example.com/image.jpg"
          value={formData.image.startsWith("data:") ? "" : formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          className="text-sm"
        />
      </div>

      {/* Basic Info Section */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Nazwa produktu *</Label>
          <Input
            id="title"
            placeholder="np. Body krotki rekaw rozowe"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description" className="flex items-center justify-between">
            <span>Opis produktu</span>
            <span className={`text-xs ${formData.description.length > descriptionMaxLength * 0.9 ? "text-destructive" : "text-muted-foreground"}`}>
              {formData.description.length}/{descriptionMaxLength}
            </span>
          </Label>
          <Textarea
            id="description"
            placeholder="Opisz produkt - material, wlasciwosci, pielegnacja..."
            value={formData.description}
            onChange={(e) => {
              if (e.target.value.length <= descriptionMaxLength) {
                setFormData(prev => ({ ...prev, description: e.target.value }));
              }
            }}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Kategoria *</Label>
          <Select 
            value={formData.category || undefined} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz kategorie" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map(cat => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.title} ({cat.type === "ladebebe" ? "2-6 lat" : "0-1 rok"})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price & Stock Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Cena (zl) *</Label>
          <div className="relative">
            <Input
              id="price"
              type="number"
              min="0"
              placeholder="79"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">zl</span>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="stock" className="flex items-center gap-2">
            <span>Stan magazynowy</span>
            {isEditing && (
              <Badge 
                variant={isOutOfStock ? "destructive" : isLowStock ? "secondary" : "outline"}
                className="text-xs"
              >
                {isOutOfStock ? "Brak" : isLowStock ? "Niski" : "OK"}
              </Badge>
            )}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 shrink-0"
              onClick={() => adjustStock(-1)}
              disabled={stockValue <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="stock"
              type="number"
              min="0"
              placeholder="40"
              value={formData.stock}
              onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
              className={`text-center ${isOutOfStock ? "border-destructive text-destructive" : isLowStock ? "border-amber-500" : ""}`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 shrink-0"
              onClick={() => adjustStock(1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {/* Quick stock adjustment buttons */}
          <div className="flex gap-1">
            {[10, 20, 40].map(amount => (
              <Button
                key={amount}
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 flex-1 text-xs"
                onClick={() => setFormData(prev => ({ ...prev, stock: amount.toString() }))}
              >
                {amount}
              </Button>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => setFormData(prev => ({ ...prev, stock: "40" }))}
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Sizes Section */}
      <div className="grid gap-3">
        <Label className="flex items-center justify-between">
          <span>Dostepne rozmiary</span>
          <span className="text-xs text-muted-foreground">
            {formData.sizes.length} wybrane
          </span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-all ${
                formData.sizes.includes(size)
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-foreground hover:bg-muted hover:border-primary/50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setFormData(prev => ({ ...prev, sizes: [...availableSizes] }))}
          >
            Zaznacz wszystkie
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setFormData(prev => ({ ...prev, sizes: [] }))}
          >
            Odznacz wszystkie
          </Button>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: ExtendedProduct;
  categoryTitle: string;
  onEdit: () => void;
  onDelete: () => void;
  compact?: boolean;
}

function ProductCard({ product, categoryTitle, onEdit, onDelete, compact }: ProductCardProps) {
  const isLowStock = product.stock < 10;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isLowStock && (
          <div className="absolute left-2 top-2">
            <Badge variant="destructive" className="text-xs">
              Niski stan
            </Badge>
          </div>
        )}
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="icon" variant="secondary" className="h-8 w-8" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="destructive" className="h-8 w-8" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className={compact ? "p-3" : "p-4"}>
        {!compact && (
          <Badge variant="secondary" className="mb-2 text-xs">
            {categoryTitle}
          </Badge>
        )}
        <h3 className={`font-medium leading-tight ${compact ? "text-sm" : ""}`}>
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-primary">{product.price} zl</span>
          <span className={`text-sm ${isLowStock ? "text-destructive" : "text-muted-foreground"}`}>
            {product.stock} szt.
          </span>
        </div>
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map(size => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
            {product.sizes.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 4}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Product List Item Component
interface ProductListItemProps {
  product: ExtendedProduct;
  categoryTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}

function ProductListItem({ product, categoryTitle, onEdit, onDelete }: ProductListItemProps) {
  const isLowStock = product.stock < 10;

  return (
    <div className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium truncate">{product.title}</h3>
          {isLowStock && (
            <Badge variant="destructive" className="text-xs shrink-0">
              Niski stan
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="text-xs">{categoryTitle}</Badge>
          <span>{product.description}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-semibold text-primary">{product.price} zl</p>
          <p className={`text-sm ${isLowStock ? "text-destructive" : "text-muted-foreground"}`}>
            {product.stock} szt.
          </p>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
