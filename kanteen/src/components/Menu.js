import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faFilter, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import MenuItem from './MenuItem';
import itemService from '../services/itemService'; 
import { useUser } from '../contexts/userContext';

export default function Menu() {
    const { user, checkLocalData } = useUser();
    const userId = user.emailId;
    const [totalItems, setTotalItems] = useState(0);
    
    useEffect(() => {
        if (userId === 'na' && !checkLocalData())
            navigate('/login');
    }, [userId]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await itemService.fetchCartItems(userId);
                setTotalItems(res.data.cart.totalItems);
            } catch (err) {
                console.error('Error fetching items', err);
            }
        }
        fetchItems();
        const interval = setInterval(() => {
            fetchItems();
        }, 2000);
        return () => clearInterval(interval);
    }, [userId])
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [isInitiated, setIsInitiated] = useState(false);
    const [message, setMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategories, setSelectedCategories] = useState({
        starters: false,
        maincourse: false,
        desserts: false,
        snackitems: false,
        tiffin: false,
        stationery: false,
        beverages: false
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await itemService.getMenuItems();
                setItems(res.data);
                if (!isInitiated) {
                    setFilteredItems(res.data);
                    setDisplayedItems(res.data);
                    setIsInitiated(true);
                }
            } catch (err) {
                console.error('Error fetching items', err);
            }
        };
        fetchItems();
        const interval = setInterval(() => {
            fetchItems();
        }, 2000);
        return () => clearInterval(interval);
    }, [isInitiated]);

    useEffect(() => {
        applySearchFilter();
    }, [filteredItems, searchTerm]);

    const searchHandler = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const applySearchFilter = () => {
        if (searchTerm) {
            const filtered = filteredItems.filter((item) => item.name.toLowerCase().includes(searchTerm));
            setDisplayedItems(filtered);
        } else {
            setDisplayedItems(filteredItems);
        }
    };

    const handleTypeChange = (type) => {
        setSelectedType(prevType => prevType === type ? '' : type);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prevCategories) => ({
            ...prevCategories,
            [category]: !prevCategories[category]
        }));
    };

    const applyFilters = () => {
        let filtered = items;

        if (selectedType) {
            filtered = filtered.filter((item) => item.type.toLowerCase() === selectedType.toLowerCase());
        }

        const activeCategories = Object.keys(selectedCategories).filter((category) => selectedCategories[category]);
        if (activeCategories.length > 0) {
            filtered = filtered.filter((item) => activeCategories.includes(item.category.toLowerCase()));
        }

        setFilteredItems(filtered);
        setIsOpen(false);
    };

    const clearFilters = () => {
        setSelectedType('');
        setSelectedCategories({
            starters: false,
            maincourse: false,
            desserts: false,
            snackitems: false,
            tiffin: false,
            stationery: false,
            beverages: false
        });
        setFilteredItems(items);
        setSearchTerm('');
    };

    const navigate = useNavigate();
    const viewCart = () => {
        navigate('/cart');
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="orderpage-nav">
                <div className="orderpage-filter" title="apply filters" onClick={toggleDropdown} >
                    <span className="orderpage-cart-nav-label" style={{ color: "black" }}>FILTERS</span>
                    <FontAwesomeIcon icon={faFilter} onClick={toggleDropdown} style={{ cursor: "pointer" }} />
                </div>
                {isOpen && (
                    <div className="filter-dropdown-menu">
                        <div className="filter-dropdown-type">
                            <div className="filter-dropdown-item">TYPE</div>
                            <div className="filter-dropdown-close" onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                            <div className="filter-dropdown-content">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedType === 'VEG'} 
                                        onChange={() => handleTypeChange('VEG')}
                                    /> 
                                    VEG
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedType === 'NON-VEG'} 
                                        onChange={() => handleTypeChange('NON-VEG')}
                                    /> 
                                    NON-VEG
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedType === 'OTHERS'} 
                                        onChange={() => handleTypeChange('OTHERS')}
                                    /> 
                                    OTHERS
                                </label>
                            </div>
                        </div>
                        <div className="filter-dropdown-category">
                            <div className="filter-dropdown-item">CATEGORY</div>
                            <div className="filter-dropdown-content">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.starters} 
                                        onChange={() => handleCategoryChange('starters')}
                                    /> 
                                    STARTERS
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.maincourse} 
                                        onChange={() => handleCategoryChange('maincourse')}
                                    /> 
                                    MAIN COURSE
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.desserts} 
                                        onChange={() => handleCategoryChange('desserts')}
                                    /> 
                                    DESSERTS
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.snackitems} 
                                        onChange={() => handleCategoryChange('snackitems')}
                                    /> 
                                    SNACK ITEMS
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.tiffin} 
                                        onChange={() => handleCategoryChange('tiffin')}
                                    /> 
                                    BREAKFAST
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.stationery} 
                                        onChange={() => handleCategoryChange('stationery')}
                                    /> 
                                    STATIONERY
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.beverages} 
                                        onChange={() => handleCategoryChange('beverages')}
                                    /> 
                                    BEVERAGES
                                </label>
                            </div>
                        </div>
                        <div className="filter-dropdown-actions">
                            <button onClick={clearFilters}>CLEAR</button>
                            <button onClick={applyFilters}>APPLY</button>
                        </div>
                    </div>
                )}
                <div className="orderpage-search">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={searchHandler}
                        placeholder='Search any item here..'
                    />
                    <span className="orderpage-search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                </div>
                <div className="orderpage-cart" title="View items in cart" onClick={viewCart}>
                    <span className="orderpage-cart-nav-label" style={{ color: "black" }}>CART</span> 
                    <span className="cart-holder">
                        {
                            totalItems > 0 &&
                            <span className="cart-items-cnt">{totalItems}</span>
                        }
                        <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                </div>
            </div>
            <div className="orderpage-floating-menu"></div>
            <div className="orderpage-menu-items">
                {displayMessage && (
                    <div className="orderpage-cart-msg">
                        {message}
                    </div>
                )}
                {displayedItems.length === 0 ? (
                    <h1 style={{ margin: "auto" }}>No items found</h1>
                ) : (
                    displayedItems.map((item) => (
                        <MenuItem key={item._id} item={item} setDisplayMessage={setDisplayMessage} setMessage={setMessage} />
                    ))
                )}
            </div>
        </div>
    );
}