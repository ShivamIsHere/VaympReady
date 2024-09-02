import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import axios from "axios";
import { server } from "../server";
import { useMediaQuery } from 'react-responsive';
import { BiSortAlt2 } from 'react-icons/bi';
import { FaFilter,FaBoxOpen, FaSadTear, FaSearch } from 'react-icons/fa';
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineClose, AiFillFilter, AiOutlineSwap  } from "react-icons/ai";
import {
  categoriesData,
  sleeveType,
  neckType,
  color,
  fabric,
  pattern,
  occasion,
  fit,
  gender,
  size,
  subCategory,
  brandingData,
  shoeSizes,
  braSizes,
  jeansSizes,
  shoeOccasions,
  accessorySubCategories,
  footwearSubCategories
} from "../static/data"; // Assuming data is imported correctly
import ClipLoader from "react-spinners/ClipLoader";
import BasicPagination from "./BasicPagination";

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isFetching = useRef(false); // To track if a fetch is ongoing
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  console.log("khvbvmmvmvumv")
  const [filteredData, setFilteredData] = useState({});
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [filters, setFilters] = useState({
    neckTypes: queryParams.get("neckTypes") ? queryParams.get("neckTypes").split(",") : [],
    colors: queryParams.get("colors") ? queryParams.get("colors").split(",") : [],
    sleeveTypes: queryParams.get("sleeveTypes") ? queryParams.get("sleeveTypes").split(",") : [],
    sizes: queryParams.get("sizes") ? queryParams.get("sizes").split(",") : [],
    fits: queryParams.get("fits") ? queryParams.get("fits").split(",") : [],
    genders: queryParams.get("genders") ? queryParams.get("genders").split(",") : [],
    occasions: queryParams.get("occasions") ? queryParams.get("occasions").split(",") : [],
    subCategorys: queryParams.get("subCategorys") ? queryParams.get("subCategorys").split(",") : [],
    fabrics: queryParams.get("fabrics") ? queryParams.get("fabrics").split(",") : [],
    brandingDatas: queryParams.get("brandingDatas") ? queryParams.get("brandingDatas").split(",") : [],
    customerRatings: queryParams.get("customerRatings") ? queryParams.get("customerRatings").split(",") : [],
    priceRanges: queryParams.get("priceRanges") ? queryParams.get("priceRanges").split(",") : [],
    shoeSize: queryParams.get("shoeSize") ? queryParams.get("shoeSize").split(",") : [],
    braSize: queryParams.get("braSize") ? queryParams.get("braSize").split(",") : [],
    patterns: queryParams.get("patterns") ? queryParams.get("patterns").split(",") : [],
    jeansSize: queryParams.get("jeansSize") ? queryParams.get("jeansSize").split(",") : [],
    shoeOccasion: queryParams.get("shoeOccasion") ? queryParams.get("shoeOccasion").split(",") : [],
    accessorySubCategorie: queryParams.get("accessorySubCategorie") ? queryParams.get("accessorySubCategorie").split(",") : [],
    footwearSubCategorie: queryParams.get("footwearSubCategorie") ? queryParams.get("footwearSubCategorie").split(",") : []
  });
    const [isClothes, setIsClothes] = useState(false);
    const [isFootWear, setIsFootWear] = useState(false);
    const [isValid, setIsValid] = useState(false);

  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);
  // const [sortBy, setSortBy] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAllSizes, setShowAllSizes] = useState(false);
  const [showAllShoesSizes, setShowAllShoesSizes] = useState(false);
  const [isJeans, setIsJeans] = useState(false);
  const [isBra, setIsBra] = useState(false);
  const [isKapra, setIsKapra] = useState(false);
  const [isJoota, setIsJoota] = useState(false);
  const [showAllBraSizes, setShowAllBraSizes] = useState(false);
  const [showAllJeansSizes, setShowAllJeansSizes] = useState(false);
  const [showAllSubCategories, setShowAllSubCategories] = useState(false);
  const [showAllShoeSubCategories, setShowAllShoesSubCategories] = useState(false);

  const [showAllColors, setShowAllColors] = useState(false);
  const [showAllNeckTypes, setShowAllNeckTypes] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    colors: false,
    sizes: false,
    subCategorys: false,
    neckTypes: false,
    fabrics: false,
    occasions: false,
    fits: false,
    sleeveTypes: false,
    brandingDatas: false,
    genders: false,
    customerRatings: false,
    priceRanges: false,
    shoeSize: false,
    patterns: false,
    braSize: false,
    jeansSize: false,
    shoeOccasion: false,
    accessorySubCategorie: false,
    footwearSubCategorie: false,
  });

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const isSmallOrMediumScreen = useMediaQuery({ query: '(max-width: 1023px)' });
  
  useEffect(() => {
    // Update filters, sort, and pagination from URL
    const searchParams = new URLSearchParams(location.search);

    const initialFilters = {
      neckTypes: searchParams.get("neckTypes") ? searchParams.get("neckTypes").split(",") : [],
      colors: searchParams.get("colors") ? searchParams.get("colors").split(",") : [],
      sleeveTypes: searchParams.get("sleeveTypes") ? searchParams.get("sleeveTypes").split(",") : [],
      sizes: searchParams.get("sizes") ? searchParams.get("sizes").split(",") : [],
      fits: searchParams.get("fits") ? searchParams.get("fits").split(",") : [],
      genders: searchParams.get("genders") ? searchParams.get("genders").split(",") : [],
      occasions: searchParams.get("occasions") ? searchParams.get("occasions").split(",") : [],
      subCategorys: searchParams.get("subCategorys") ? searchParams.get("subCategorys").split(",") : [],
      fabrics: searchParams.get("fabrics") ? searchParams.get("fabrics").split(",") : [],
      patterns: searchParams.get("patterns") ? searchParams.get("patterns").split(",") : [],
      brandingDatas: searchParams.get("brandingDatas") ? searchParams.get("brandingDatas").split(",") : [],
      customerRatings: searchParams.get("customerRatings") ? searchParams.get("customerRatings").split(",") : [],
      priceRanges: searchParams.get("priceRanges") ? searchParams.get("priceRanges").split(",") : [],
      shoeSize: searchParams.get("shoeSize") ? searchParams.get("shoeSize").split(",") : [],
      braSize: searchParams.get("braSize") ? searchParams.get("braSize").split(",") : [],
      jeansSize: searchParams.get("jeansSize") ? searchParams.get("jeansSize").split(",") : [],
      shoeOccasion: searchParams.get("shoeOccasion") ? searchParams.get("shoeOccasion").split(",") : [],
      accessorySubCategorie: searchParams.get("accessorySubCategorie") ? searchParams.get("accessorySubCategorie").split(",") : [],
      footwearSubCategorie: searchParams.get("footwearSubCategorie") ? searchParams.get("footwearSubCategorie").split(",") : []
  };

    const initialSortBy = searchParams.get("sortBy") || "";
    const initialPage = parseInt(searchParams.get("page")) || 1;

    setFilters(initialFilters);
    setSortBy(initialSortBy);
    setCurrentPage(initialPage);
  }, [location.search]);

  const fetchFilteredProducts = async (currentPage=1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${server}/product/get-all-searched-products`, {
        params: {
          query,
          page: currentPage,
          color: filters.colors.join(","),
          neckType: filters.neckTypes.join(","),
          size: filters.sizes.join(","),
          sleeveType: filters.sleeveTypes.join(","),
          fit: filters.fits.join(","),
          gender: filters.genders.join(","),
          occasion: filters.occasions.join(","),
          subCategory: filters.subCategorys.join(","),
          fabric: filters.fabrics.join(","),
          pattern: filters.patterns.join(","),
          brandingData: filters.brandingDatas.join(","),
          customerRating: filters.customerRatings.join(","),
          priceRange: filters.priceRanges.join(","),
          shoeSizes:  filters.shoeSize.join(","),
          braSizes:  filters.braSize.join(","),
          jeansSizes:  filters.jeansSize.join(","),
          shoeOccasions:  filters.shoeOccasion.join(","),
          accessorySubCategories:  filters.accessorySubCategorie.join(","),
          footwearSubCategories:  filters.footwearSubCategorie.join(","),          
          sortBy,
        },
      });

      const data = response.data;
      if (data.success) {
        setFilteredData((prevData) => ({
          ...prevData,
          [currentPage]: data.products,
        }));
        // setFilteredDatas(data.products);
        setTotalPages(data.totalPages);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    fetchFilteredProducts();
     //window.location.reload()
   console.log("ghghghghghghghg",location.search)
  }, [filters, sortBy, currentPage, query]);



 
  
  const fetchFilteredProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${server}/product/get-all-searched-products`, {
        params: {
          query,
          page: currentPage,
          color: filters.colors.join(","),
          neckType: filters.neckTypes.join(","),
          size: filters.sizes.join(","),
          sleeveType: filters.sleeveTypes.join(","),
          fit: filters.fits.join(","),
          gender: filters.genders.join(","),
          occasion: filters.occasions.join(","),
          subCategory: filters.subCategorys.join(","),
          fabric: filters.fabrics.join(","),
          pattern: filters.patterns.join(","),
          brandingData: filters.brandingDatas.join(","),
          customerRating: filters.customerRatings.join(","),
          priceRange: filters.priceRanges.join(","),
          shoeSizes:  filters.shoeSize.join(","),
          braSizes:  filters.braSize.join(","),
          jeansSizes:  filters.jeansSize.join(","),
          shoeOccasions:  filters.shoeOccasion.join(","),
          accessorySubCategories:  filters.accessorySubCategorie.join(","),
          footwearSubCategories:  filters.footwearSubCategorie.join(","),          
          sortBy,
        },
      });

      const data = response.data;
      if (data.success) {
        setFilteredDatas(data.products);
        setTotalPages(data.totalPages);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setInitialLoading(false); // Update initial loading state

    }
  };
useEffect(() => {

  fetchFilteredProduct();
}, [filters, sortBy, currentPage, query]); 

// useEffect(() => {
//   if (isSmallOrMediumScreen) {
//     fetchFilteredProducts(currentPage);
//   }
// }, [filters, currentPage, isSmallOrMediumScreen]);

useEffect(() => {
  const fetchData = async () => {
    if (isSmallOrMediumScreen) {
      const pagesToFetch = Array.from({ length: currentPage }, (_, i) => i + 1);
      await Promise.all(pagesToFetch.map((page) => fetchFilteredProducts(page)));
    } else {
      await fetchFilteredProduct();
    }
  };

  fetchData();
}, [filters, sortBy, currentPage, query, isSmallOrMediumScreen]);




useEffect(() => {
  const clothesKeywords = [
    "tshirts", "tshirt", "blouses", "shirts", "tank tops", "sweaters", "hoodies", "jeans", "trousers", "shorts",
    "skirts", "leggings", "jackets", "coats", "blazers", "vests", "raincoats", "casual dresses", "formal dresses",
    "maxi dresses", "cocktail dresses", "sundresses", "sports bras", "gym tops", "yoga pants", "track pants",
    "running shorts", "pajamas", "robes", "sweatpants", "lounge tops", "half pants", "bras", "panties", "boxers",
    "briefs", "undershirts", "suits", "tuxedos", "full sleeve", "half sleeve", "short sleeve", "sleeveless",
    "modal", "linen blend", "wool blend", "poly cotton", "nylon", "viscose rayon", "cotton blend", "elastane",
    "organic cotton", "polyester", "pure cotton", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl", "5xl", "6xl",
    "7xl", "8xl", "beach wear", "casual", "formal", "lounge wear", "party", "sports", "boxy", "compression", "loose",
    "oversized", "regular", "slim", "clothes", "shirt", "dresses", "cloths", "cloth", "kapra", "dress","underwears",
    "salwar suits","skirt","bra","jeans","undergarments","kurtis","socks","tops","Animal Print",
    "Checkered","Color Block","Dyed/Ombre","Embellished","Embroidered","Ethnic Motifs","Floral Print","Geometric Print",
    "Graphic Print","Military Camouflage","Polka Print","Printed","Self Design","Solid","Striped","Washed","Woven Design","Sherwan","Night Suit","Half pant","Full Pant","Churidar","Co-ords","Coords","Palazzos","Capris","Tucker","Three quater","Jeggings","Lingerie","Lehenga choli","Night dress","Long Kurti","Short Kurti","Bandi","Nehru Jacket","Saree","Shawl","Boxer","Track suit","Dhotis","Dupatta","Lungi","Sweatshirts","Thermals","Thermal tops","Thermal bottom","Thermal set","Inner","Dungarees","Harem pants","patiala","stockings","tights","Cargo","Body Suits","Shrug","Long coats","Frocks","one piece","body cons","Crop tops","Gowns","Hot pants","Stoles","Mufflers","Faded","No Fade","light Fade","Heavy Fade","Collar Neck" , "Round Neck", "V Neck", "Turtle Neck", "Zip Neck", "High Neck", "Hooded Neck", "Key Hole Neck", "Mandarin Collar", "Peter Pan Collar", "Boat Neck", "RacerBack", "Cowl Neck", "Scoop Neck", "Shawl Neck", "Square Neck", "Stylished Neck", "Halter Neck", "Crew Neck", "Henley Neck", "Polo collar", "Collar less", "Sweetheart neck", "plunge neck", "strapless", "Lycra", "Linen Blend", "Wool Blend", "Poly Cotton", "Nylon", "Viscose Rayon", "Cotton Blend", "Denim", "Organic Cotton", "Polyester", "Pure Cotton", "Modal", "Elastane", "Cotton", "Synthetic", "Silk", "Satin", "Canvas", "Leather", "Khaki"
  
  ];

  const shoesKeywords = [
    "shoe", "sneaker", "boot", "heel", "sandal", "flip-flop", "loafer", "slipper", "casual", "formal", "sports",
    "party", "outdoor", "work", "beach", "hiking", "wedding", "everyday", "flip flops", "slide sandals",
    "house slippers", "thong slippers", "gladiator sandals", "sport sandals", "wedge sandals", "heeled sandals",
    "flat sandals", "sneakers", "running shoes", "loafers", "oxfords", "brogues", "boots", "heels", "flats",
    "moccasins", "derbies", "espadrilles", "shoes", "crocs", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7",
    "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15", "15.5",
    "16", "joota", "juta", "jhoota", "jutta", "sliper", "slipers","shoes","footwear","leathershoes"
  ];

  const stopWords = [
    "for", "in", "the", "and", "a", "of", "to", "is", "on", "at", "by", "with", "from", "as", "about", "into",
    "through", "during", "before", "after", "over", "between", "under", "above", "below", "up", "down", "out", "off",
    "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any",
    "both", "each", "few", "more", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than",
    "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"
  ];

  const queryWords = query.toLowerCase().split(" ").filter(word => !stopWords.includes(word));
  const Bra = queryWords.some(word => ["bra", "bras", "bra's"].includes(word));

  if (Bra) {
    setIsBra(true)
    console.log("The query includes a term related to 'bra'.");
  }
  const Jeans = queryWords.some(word => ["jeans", "jean", "jean's"].includes(word));

if (Jeans) {
setIsJeans(true)
console.log("The query includes a term related to 'Jeans'.");
}
const kapra = queryWords.some(word => ["kapra", "cloths", "cloth's","clothes"].includes(word));

if (kapra) {
setIsKapra(true)
console.log("The query includes a term related to 'Jeans'.");
}
const Joota = queryWords.some(word => ["joota", "juta", "Footwear's","footwear","footwears","footwears'","footwear'"].includes(word));

if (Joota) {
setIsJoota(true)
console.log("The query includes a term related to 'Jeans'.");
}
    const isClothesQuery = queryWords.some(word => clothesKeywords.some(keyword => keyword.includes(word)));
    const isShoesQuery = queryWords.some(word => shoesKeywords.some(keyword => keyword.includes(word)));
  console.log("hfejshmehgmfe,")
    if (isClothesQuery) {
      setIsClothes(true);
      console.log("setIsClotheszzzzzzzzzzzzzzzzz",isClothesQuery)
    }
    if (isShoesQuery) {
      setIsFootWear(true);
      console.log("setIsFootWear",isFootWear)

    }
    if (isClothesQuery !== isShoesQuery) {
      setIsValid(true);
    }

  }, [query,filters]);

  console.log("bchktfhmc")

  const handleCheckboxChange = (filterType, value) => {
    const updatedFilters = filters[filterType].includes(value)
      ? filters[filterType].filter(item => item !== value)
      : [...filters[filterType], value];

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: updatedFilters,
    }));

    // Update URL with selected filters
    const params = new URLSearchParams(location.search);
    params.set(filterType, updatedFilters.join(","));
    params.delete('page');  // Reset to page 1 on filter change
    navigate(`${location.pathname}?${params.toString()}`);
    // window.location.reload()
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate(`${location.pathname}?${params.toString()}`);
    // window.scrollTo(0, 0);

  };


  const handleSortOption = (sortOption) => {
    setSortBy(sortOption);
    const params = new URLSearchParams(location.search);
    params.set("sortBy", sortOption);
    navigate(`${location.pathname}?${params.toString()}`);
  };

 

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // setCurrentPage(1);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDropdown = (dropdownType) => {
    setDropdowns(prevDropdowns => ({
      ...prevDropdowns,
      [dropdownType]: !prevDropdowns[dropdownType]
    }));
  };

  const toggleSortDrawer = (dropdownType) => {
    setSortDrawerOpen(!sortDrawerOpen);
  };

  // navigate(`${location.pathname}?${searchParams.toString()}`);
  // console.log("zzzzzzzzz",filters);


  const toggleShowAll = (type) => {

    switch (type) {
      case "sizes":
        setShowAllSizes(!showAllSizes);
        break;
        case "shoeSize":
        setShowAllShoesSizes(!showAllShoesSizes);
        break;
        case "braSize":
        setShowAllBraSizes(!showAllBraSizes);
        break;
        case "jeansSize":
        setShowAllJeansSizes(!showAllJeansSizes);
        break;
      case "subCategorys":
        setShowAllSubCategories(!showAllSubCategories);
        break;
        case "footwearSubCategorie":
        setShowAllShoesSubCategories(!showAllShoeSubCategories);
        break;

      case "colors":
        setShowAllColors(!showAllColors);
        break;
      case "neckTypes":
        setShowAllNeckTypes(!showAllNeckTypes);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setFilters({
      colors: [],
      sizes: [],
      brandingDatas: [],
      neckTypes: [],
      sleeveTypes: [],
      fabrics: [],
      patterns:[],
      occasions: [],
      fits: [],
      subCategorys: [],
      genders: [],
      customerRatings: [],
      priceRanges: [],
      shoeSize: [],
      braSize: [],
      jeansSize: [],
      shoeOccasion: [],
      accessorySubCategorie: [],
      footwearSubCategorie: [],
    });
    setCurrentPage(1);
    setIsFootWear(false);
    setIsClothes(false);
    setIsJeans(false);
    setIsBra(false);
    setShowAllSizes(false);
    setShowAllShoesSizes(false);
    setShowAllJeansSizes(false);
    setShowAllBraSizes(false);
    setShowAllSubCategories(false);
    setShowAllShoesSubCategories(false);
    setShowAllColors(false);
    setShowAllNeckTypes(false);
    setDropdowns({
      colors: false,
      sizes: false,
      subCategorys: false,
      neckTypes: false,
      fabrics: false,
      patterns: false,
      occasions: false,
      fits: false,
      sleeveTypes: false,
      brandingDatas: false,
      genders: false,
      customerRatings: false,
      priceRanges: false,
      shoeSize: false,
      braSize: false,
      jeansSize: false,
      shoeOccasion: false,
      accessorySubCategorie: false,
      footwearSubCategorie: false,
    });
    const params = new URLSearchParams(location.search);
  params.delete("neckTypes");
  params.delete("colors");
  params.delete("sleeveTypes");
  params.delete("sizes");
  params.delete("fits");
  params.delete("genders");
  params.delete("occasions");
  params.delete("subCategorys");
  params.delete("fabrics");
  params.delete("patterns");
  params.delete("brandingDatas");
  params.delete("customerRatings");
  params.delete("priceRanges");
  params.delete("shoeSize");
  params.delete("braSize");
  params.delete("jeansSize");
  params.delete("shoeOccasion");
  params.delete("accessorySubCategorie");
  params.delete("footwearSubCategorie");
  params.delete("sortBy");
  params.delete("page");

  // Update the URL
  navigate(`${location.pathname}?${params.toString()}`);

  };





  const visibleSizes = showAllSizes ? size : size.slice(0, 6);
  const visibleShoesSizes = showAllShoesSizes ? shoeSizes : shoeSizes.slice(0, 6);
  const visibleBraSizes = showAllBraSizes ? braSizes : braSizes.slice(0, 6);
  const visibleJeansSizes = showAllJeansSizes ? jeansSizes : jeansSizes.slice(0, 6);

  const visibleSubCategories = showAllSubCategories ? subCategory : subCategory.slice(0, 6);
  const visibleShoeSubCategories = showAllShoeSubCategories ? footwearSubCategories : footwearSubCategories.slice(0, 6);

  const visibleColors = showAllColors ? color : color.slice(0, 6);
  const visibleNeckTypes = showAllNeckTypes ? neckType : neckType.slice(0, 6);


  // const { ref: loadMoreRef, inView } = useInView({
  //   threshold: 1.0,
  // });
  // // console.log("currentPagecurrentPage",currentPage)
  // // console.log("currentPagecurrentPage",initialPage)


  // useEffect(() => {
  //   if (inView && !isLoading&& currentPage < totalPages) {
  //     handlePageChange(currentPage + 1);
  //   }
  // }, [inView, currentPage, totalPages,isLoading]);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1.0,
  });
  
  // useEffect(() => {
  //   if (inView && !isLoading&& currentPage < totalPages) {
  //     handlePageChange(currentPage + 1);
  //   }
  // }, [inView, currentPage, totalPages,isLoading,filters]);

  // useEffect(() => {
  //   if (inView && !isLoading && currentPage < totalPages) {
  //     setCurrentPage(prevPage => {
  //       const nextPage = prevPage + 1;
  //       fetchFilteredProducts(nextPage);
  //       return nextPage;
  //     });
  //   }
  // }, [inView, isLoading, totalPages]);
  useEffect(() => {
    if (inView && !isFetching.current && currentPage < totalPages) {
      isFetching.current = true; // Set fetching to true to prevent multiple fetches
      
      const fetchNextPage = async () => {
        const nextPage = currentPage + 1;

        // Fetch data for the next page
        await fetchFilteredProducts(nextPage);
        
        // Only update the state after the fetch is complete
        setCurrentPage(nextPage);
        handlePageChange(nextPage); // Update the URL with the new page number

        isFetching.current = false; // Set fetching to false after completion
      };

      fetchNextPage();
    }
  }, [inView, currentPage, totalPages]);
  const getAllProducts = () => {
    const allProducts = [];
    Object.values(filteredData).forEach((pageData) => {
      allProducts.push(...pageData);
    });
    return allProducts;
  };

// console.log("getAllProducts()getAllProducts()",getAllProducts())
  return (
    <>
      {initialLoading  && currentPage === 1 ? (
        <Loader />
      ): (
        <div className="w-full">
          <Header activeHeading={2} />
          <div className={`${styles.section}`}>
          {/* {totalPage === 0 && (
              <h1 className="text-center text-xl font-semibold text-gray-700 mt-4 mb-1">
                No Product Found
              </h1>

            )}<div style={{height:'20px',border:'2px solid black',backgroundColor:'red'}}></div> */}
            {/* for MObile view */}
            {totalPage !== 0 && (
  <h1 className="text-2xl sm:text-3xl font-normal text-gray-800 mb-2 ml-2 ">
    Search Results for: <span className="text-blue-600">{query}</span>
  </h1>
)}

         {/* <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-2 flex justify-around items-center border-t border-gray-200">
         <button className="flex flex-row items-center space-x-2 p-2 hover:bg-gray-100 rounded "    onClick={toggleDrawer}>
        <BiSortAlt2 className="w-5 h-5 text-gray-500 opacity-75" />
        <span className="font-medium text-sm">SORT</span>
      </button>
      <div className="w-px h-6 bg-gray-400 opacity-50 mx-2"></div>
      <button className="flex flex-row items-center space-x-2 p-2 hover:bg-gray-100 rounded"  onClick={toggleSortDrawer}>
        <FaFilter className="w-4 h-4 text-gray-500 opacity-75" />
        <span className="font-medium text-sm">FILTER</span>
      </button>
      </div> */}

      <div className="flex flex-col lg:flex-row">
          {/* Add your filters and sorting here */}
        </div>
        {isValid===true&&<div className="lg:hidden sticky z-10">
              {/* <div className="w-1/2 p-0 m-0">
                <button
                  className="w-full bg-blue-100 flex items-center justify-center font-bold text-lg tracking-wider border-t-1 border-b-2 text-gray-700 p-3 rounded-lg mb-2 border-gray-500 transition duration-300 ease-in-out md:hidden"
                  onClick={toggleDrawer}
                >
                   <AiFillFilter className="mr-2 text-xl text-gray-800" />
                  Filter
                </button>
              </div> */}
              {/* <div className="w-1/2 p-0 m-0">
                <button
                  className="w-full bg-blue-100 flex items-center justify-center font-bold text-lg tracking-wider border-t-1 border-b-2 text-gray-700 p-3 rounded-lg mb-2 border-gray-500 transition duration-300 ease-in-out md:hidden"
                  onClick={toggleSortDrawer}
                >
                   <AiOutlineSwap className="text-xl text-gray-800 mr-2" />
                  Sort
                </button>
              </div> */}
      
         <div className="fixed bottom-0 left-0 right-0 shadow-md p-2 flex justify-around items-center border-t border-gray-300 bg-zinc-100">
         <button className="flex flex-row items-center space-x-2 p-2 hover:bg-gray-100 rounded" onClick={toggleDrawer}>
        <FaFilter className="w-4 h-4 text-gray-600 opacity-75" />
        <span className="font-bold text-base">FILTER</span>
      </button>
      <div className="w-px h-10 bg-gray-500 opacity-75"></div>
      <button className="flex flex-row items-center space-x-2 p-2 hover:bg-gray-100 rounded" onClick={toggleSortDrawer}>
        <BiSortAlt2 className="w-6 h-6 text-gray-600 opacity-75" />
        <span className="font-bold text-base">SORT</span>
      </button>
      </div>

       </div>}

            {/* for larger screen */}

    
            {isValid===true&&filteredDatas.length !== 0&&
              <div>
  <div
    className="hidden lg:flex fixed right-5 bottom-24 mb-2 p-4 bg-red-500 rounded-full text-white cursor-pointer"style={{ zIndex: 1 }}
    onClick={toggleDrawer}
  >
    <FaFilter size={25} />
  </div>
  <div
    className="hidden lg:flex fixed right-5 bottom-10 p-4 bg-red-500 rounded-full text-white cursor-pointer"style={{ zIndex: 1 }} 
    onClick={toggleSortDrawer}
  >
    <BiSortAlt2 size={25} />
  </div>
</div>}



            <div
              className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={toggleDrawer}
            ></div>
            <div
              className={`fixed inset-y-0 left-0 z-50 w-80 bg-white p-6 overflow-y-auto transition-transform transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filter Options</h2>
                <AiOutlineClose className="cursor-pointer" onClick={toggleDrawer} />
              </div>
              <form onSubmit={handleFilterSubmit}>
              <div className="mb-4">
                    <button
                      type="button"
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>
                  </div>
                {/* Color Filter */}
                <div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("colors")}
                  >
                    Color
                    {dropdowns.colors ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.colors && 
                    visibleColors.map((c) => (
                      <label key={c.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={c.name}
                          checked={filters.colors.includes(c.name)}
                          onChange={() => handleCheckboxChange("colors", c.name)}
                        />
                        {c.name}
                      </label>
                    ))}
                  {dropdowns.colors && color.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => toggleShowAll("colors")}
                    >
                      {showAllColors ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
                {/* Size Filter */}
                {isFootWear===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("shoeSize")}
                  >
                    Size
                    {dropdowns.shoeSize ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.shoeSize &&
                    visibleShoesSizes.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.type}
                          checked={filters.shoeSize.includes(s.type)}
                          onChange={() => handleCheckboxChange("shoeSize", s.type)}
                        />
                        {s.type}
                      </label>
                    ))}
                  {dropdowns.shoeSize && shoeSizes.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => toggleShowAll("shoeSize")}
                    >
                      {showAllShoesSizes ? "See Less" : "See More"}
                    </button>
                  )}
                </div>}


                {isClothes===true&&isBra===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("braSize")}
                  >
                    Size
                    {dropdowns.braSize ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.braSize &&
                    visibleBraSizes.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.type}
                          checked={filters.braSize.includes(s.type)}
                          onChange={() => handleCheckboxChange("braSize", s.type)}
                        />
                        {s.type}
                      </label>
                    ))}
                  {dropdowns.braSize && braSizes.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => toggleShowAll("braSize")}
                    >
                      {showAllBraSizes ? "See Less" : "See More"}
                    </button>
                  )}
                </div>}



                {isClothes===true&&isJeans==true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("jeansSize")}
                  >
                    Size
                    {dropdowns.jeansSize ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.jeansSize &&
                    visibleJeansSizes.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.type}
                          checked={filters.jeansSize.includes(s.type)}
                          onChange={() => handleCheckboxChange("jeansSize", s.type)}
                        />
                        {s.type}
                      </label>
                    ))}
                  {dropdowns.jeansSize && jeansSizes.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => toggleShowAll("jeansSize")}
                    >
                      {showAllJeansSizes ? "See Less" : "See More"}
                    </button>
                  )}
                </div>}
                {isClothes===true&&isBra!=true&&isJeans!=true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("sizes")}
                  >
                    Size
                    {dropdowns.sizes ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.sizes &&
                    visibleSizes.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.type}
                          checked={filters.sizes.includes(s.type)}
                          onChange={() => handleCheckboxChange("sizes", s.type)}
                        />
                        {s.type}
                      </label>
                    ))}
                  {dropdowns.sizes && size.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => toggleShowAll("sizes")}
                    >
                      {showAllSizes ? "See Less" : "See More"}
                    </button>
                  )}
                </div>}
                {/* SubCategory Filter */}
                {isClothes===true&&isKapra===true&&<div className="mb-4">                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("subCategorys")}
                  >
                    Category
                    {dropdowns.subCategorys ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.subCategorys &&
                    visibleSubCategories.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.title}
                          checked={filters.subCategorys.includes(s.title)}
                          onChange={() => handleCheckboxChange("subCategorys", s.title)}
                        />
                        {s.title}
                      </label>
                    ))}
                  {dropdowns.subCategorys && subCategory.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => toggleShowAll("subCategorys")}
                    >
                      {showAllSubCategories ? "See Less" : "See More"}
                    </button>
                  )}
                </div>}
                {isClothes===true&&isJeans!=true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("patterns")}
                  >
                    Pattern
                    {dropdowns.patterns ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.patterns &&
                    pattern.map((f) => (
                      <label key={f.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={f.type}
                          checked={filters.patterns.includes(f.type)}
                          onChange={() => handleCheckboxChange("patterns", f.type)}
                        />
                        {f.type}
                      </label>
                    ))}
                </div>}
                {isFootWear===true&&isJoota===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("footwearSubCategorie")}
                  >
                    Category
                    {dropdowns.footwearSubCategorie ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.footwearSubCategorie &&
                    visibleShoeSubCategories.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.title}
                          checked={filters.footwearSubCategorie.includes(s.title)}
                          onChange={() => handleCheckboxChange("footwearSubCategorie", s.title)}
                        />
                        {s.title}
                      </label>
                    ))}
                  {dropdowns.footwearSubCategorie && footwearSubCategories.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => toggleShowAll("footwearSubCategorie")}
                    >
                      {showAllShoeSubCategories ? "See Less" : "See More"}
                    </button>
                  )}
                </div>}

                
                {/* Neck Type Filter */}
                {isClothes===true&&isBra!=true&&isJeans!=true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => setDropdowns(prev => ({ ...prev, neckTypes: !prev.neckTypes }))}
                    >
                    Neck Type
                    {dropdowns.neckTypes ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.neckTypes &&
                    visibleNeckTypes.map((n) => (
                      <label key={n.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={n.title}
                          checked={filters.neckTypes.includes(n.title)}
                          onChange={() => handleCheckboxChange("neckTypes", n.title)}
                        />
                        {n.title}
                      </label>
                    ))}
                  {dropdowns.neckTypes && neckType.length > 6 && (
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => setShowAllNeckTypes(!showAllNeckTypes)}
                    >
                      {showAllNeckTypes ? "See Less" : "See More"}
                    </button>
                  )}
                </div>}
                {/* Fabric Filter */}
                {isClothes===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("fabrics")}
                  >
                    Fabric
                    {dropdowns.fabrics ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.fabrics &&
                    fabric.map((f) => (
                      <label key={f.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={f.type}
                          checked={filters.fabrics.includes(f.type)}
                          onChange={() => handleCheckboxChange("fabrics", f.type)}
                        />
                        {f.type}
                      </label>
                    ))}
                </div>}
                {isClothes===true&&isJeans===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("patterns")}
                  >
                    Pattern
                    {dropdowns.patterns ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.patterns &&
                    pattern.map((f) => (
                      <label key={f.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={f.type}
                          checked={filters.patterns.includes(f.type)}
                          onChange={() => handleCheckboxChange("patterns", f.type)}
                        />
                        {f.type}
                      </label>
                    ))}
                </div>}
                {/* Occasion Filter */}
                {isClothes===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("occasions")}
                  >
                    Occasion
                    {dropdowns.occasions ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.occasions &&
                    occasion.map((o) => (
                      <label key={o.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={o.type}
                          checked={filters.occasions.includes(o.type)}
                          onChange={() => handleCheckboxChange("occasions", o.type)}
                        />
                        {o.type}
                      </label>
                    ))}
                </div>}
                {isFootWear===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("shoeOccasion")}
                  >
                    Occasion
                    {dropdowns.shoeOccasion ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.shoeOccasion &&
                    shoeOccasions.map((o) => (
                      <label key={o.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={o.type}
                          checked={filters.shoeOccasion.includes(o.type)}
                          onChange={() => handleCheckboxChange("shoeOccasion", o.type)}
                        />
                        {o.type}
                      </label>
                    ))}
                </div>}
                {/* Fit Filter */}
                {isClothes===true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("fits")}
                  >
                    Fit
                    {dropdowns.fits ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.fits &&
                    fit.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.type}
                          checked={filters.fits.includes(s.type)}
                          onChange={() => handleCheckboxChange("fits", s.type)}
                        />
                        {s.type}
                      </label>
                    ))}
                </div>}
                {/* Sleeve Type Filter */}
                {isClothes===true&&isBra!=true&&isJeans!=true&&<div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("sleeveTypes")}
                  >
                    Sleeve Type
                    {dropdowns.sleeveTypes ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.sleeveTypes &&
                    sleeveType.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.title}
                          checked={filters.sleeveTypes.includes(s.title)}
                          onChange={() => handleCheckboxChange("sleeveTypes", s.title)}
                        />
                        {s.title}
                      </label>
                    ))}
                </div>}
                {/* Gender Filter */}
                <div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("genders")}
                  >
                    Gender
                    {dropdowns.genders ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.genders &&
                    gender.map((s) => (
                      <label key={s.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={s.type}
                          checked={filters.genders.includes(s.type)}
                          onChange={() => handleCheckboxChange("genders", s.type)}
                        />
                        {s.type}
                      </label>
                    ))}
                </div>
                {/* Customer Rating Filter */}
                <div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("customerRatings")}
                  >
                    Customer Rating
                    {dropdowns.customerRatings ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.customerRatings &&
                    [
                      { label: "3 and below", value: "3-and-below" },
                      { label: "3 and above", value: "3-to-4" },
                      { label: "4 and above", value: "4-and-above" },
                    ].map((rating) => (
                      <label key={rating.id} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={rating.value}
                          checked={filters.customerRatings.includes(rating.value)}
                          onChange={() => handleCheckboxChange("customerRatings", rating.value)}
                        />
                        {rating.label}
                      </label>

                    ))}

                </div>
                {/* Price Range Filter */}
                <div className="mb-4">
                  <h3
                    className="cursor-pointer flex items-center justify-between border-t-1 border-b-2 border-gray-300 text-gray-700 p-3 rounded-lg mb-2 hover:border-gray-500 transition duration-300 ease-in-out"
                    onClick={() => toggleDropdown("priceRanges")}
                  >
                    Price Range
                    {dropdowns.priceRanges ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                  </h3>
                  {dropdowns.priceRanges &&
                    ["0-500", "501-1000", "1001-1500", "1501-2000", "2001-10000"].map((range) => (
                      <label key={range} className="block ml-2 my-2">
                        <input
                          type="checkbox"
                          value={range}
                          checked={filters.priceRanges.includes(range)}
                          onChange={() => handleCheckboxChange("priceRanges", range)}
                        />
                        {`₹${range.split('-')[0]} - ₹${range.split('-')[1]}`}
                      </label>
                    ))}
                </div>
                   
              </form>
            </div>
            {getAllProducts().length === 0 ? (
              // <div className="text-center text-gray-500 mt-4">No products found</div>
              <div className="flex justify-center bg-zinc-100 items-center lg:hidden">
           <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-blue-100 to-blue-300 p-6 sm:p-12">
              <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="mx-auto mb-6 w-32 h-32 flex items-center justify-center text-blue-600">
                  <FaBoxOpen size={64} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">No Products Found</h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                  Sorry, we couldn't find any products that match your search.
                </p>
                <div className="flex justify-center space-x-4 text-blue-600">
                  <FaSadTear size={32} />
                  <FaSearch size={32} />
                </div>
              </div>
            </div> 
            </div>
            ) : (
              <>
              {totalPage===0&&
                <h1 className="text-center text-xl font-semibold text-gray-700 mt-4 mb-1">
                Here are some suggested Products
              </h1>
              }
            <div className="grid grid-cols-2 lg:grid-cols-2 lg:hidden gap-1 w-full mx-0">
              {getAllProducts().map((product) => (
                <ProductCard data={product} key={product._id} />
              ))}
            </div>
            </>
            )}
            {filteredDatas.length === 0 ? (
              // <div className="text-center text-gray-500 mt-4">No products found</div>
              <div className="bg-zinc-100 hidden lg:flex justify-center items-center">
<div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-blue-100 to-blue-300 p-6 sm:p-12">
              <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="mx-auto mb-6 w-32 h-32 flex items-center justify-center text-blue-600">
                  <FaBoxOpen size={64} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">No Products Found</h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                  Sorry, we couldn't find any products that match your search.
                </p>
                <div className="flex justify-center space-x-4 text-blue-600">
                  <FaSadTear size={32} />
                  <FaSearch size={32} />
                </div>
              </div>
            </div>
              {/* <img src={`${process.env.PUBLIC_URL}/noproductshd.png`} alt="No Products Found" className="max-w-4/5 max-h-4/5" /> */}
            </div>
            ): (
              <>
            <div className="hidden lg:grid lg:grid-cols-5 gap-8 w-full px-14">
              {filteredDatas.map((product) => (
                <ProductCard data={product} key={product._id} />
              ))}
            </div>
            </>
            )}

            {/* Loader for Medium and Small Screens */}
            <div ref={loadMoreRef} className="mt-4 flex justify-center lg:hidden">
            {isLoading===true && <ClipLoader
                  color="#2874F0"
                  size={55}
                  // loading={isLoading}
                  thick={50}
                  speedMultiplier={1}
                />}
            </div>

          {/* Pagination for Large Screens */}
            <div className="flex flex-col flex-1 p-4">
        
            {filteredDatas.length !== 0 && (
  <div className="mt-4 justify-center hidden lg:flex">
    {typeof window !== "undefined" && window.innerWidth >= 1024 && (
      <BasicPagination count={totalPages} page={currentPage} onChange={handlePageChange} />
    )}
  </div>
)}

      </div>
    </div>
          {/* Sort Drawer */}
          
          <div
              className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity ${sortDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={toggleSortDrawer}
            ></div>
      <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-4 border-0">


      <div className={`fixed left-0 bottom-0 w-full bg-white shadow-lg transition-transform transform ${sortDrawerOpen ? 'translate-y-0' : 'translate-y-full'} z-50`}>
  <div className="flex items-center justify-between p-4">
    <h2 className="text-xl font-semibold">Sort By</h2>
    <button onClick={toggleSortDrawer} className="text-2xl">
      <AiOutlineClose />
    </button>
  </div>
  <div className="flex flex-col p-4">
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByPriceLowToHigh"
        name="sortBy"
        className="mr-2 my-2"
        value="Price: Low to High"
        onClick={() => handleSortOption("price-asc")}
        checked={sortBy === "price-asc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByPriceLowToHigh">Price (Low to High)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByPriceHighToLow"
        name="sortBy"
        className="mr-2 my-2"
        value="Price: High to Low"
        onClick={() => handleSortOption("price-desc")}
        checked={sortBy === "price-desc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByPriceHighToLow">Price (High to Low)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByRatingLowToHigh"
        name="sortBy"
        className="mr-2 my-2"
        value="Rating: Low to High"
        onClick={() => handleSortOption("rating-asc")}
        checked={sortBy === "rating-asc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByRatingLowToHigh">Rating (Low to High)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByRatingHighToLow"
        name="sortBy"
        className="mr-2 my-2"
        value="Rating: High to Low"
        onClick={() => handleSortOption("rating-desc")}
        checked={sortBy === "rating-desc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByRatingHighToLow">Rating (High to Low)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByDateOldToNew"
        name="sortBy"
        className="mr-2 my-2"
        value="Date: Old to New"
        onClick={() => handleSortOption("date-asc")}
        checked={sortBy === "date-asc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByDateOldToNew">Date (Old to New)</label>
    </div>
    <div className="flex items-center mb-1">
      <input
        type="radio"
        id="sortByDateNewToOld"
        name="sortBy"
        className="mr-2 my-2"
        value="Date: New to Old"
        onClick={() => handleSortOption("date-desc")}
        checked={sortBy === "date-desc"}
        onChange={toggleSortDrawer}
      />
      <label htmlFor="sortByDateNewToOld">Date (New to Old)</label>
    </div>
  </div>
</div>
</div>
         {/* <Footer /> */}
        </div>
      )}
      </>
      
  );
};

export default SearchResults;