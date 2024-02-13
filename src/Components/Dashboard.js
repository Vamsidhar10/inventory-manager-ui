// Dashboard.js
import React, { useState,useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Home, Inventory, Category, Build, People, ShoppingCart, Storefront, Warehouse, ViewList, Help, Report, Logout, Person, IntegrationInstructions } from '@mui/icons-material';
import ItemTable from './ItemTable';
import { Button, TextField, IconButton } from '@mui/material';
import { AddCircleOutline, FilterList, Search } from '@mui/icons-material';

const Dashboard = () => {
    const [inventoryItems, setInventoryItems] = useState([
        {
            "id": 1,
            "sku": "ETSY-FOREST",
            "name": "Etsy Bundle Pack",
            "category": {
                "id": 1,
                "name": "Bundles"
            },
            "tags": [
                {
                    "id": 1,
                    "name": "Etsy"
                },
                {
                    "id": 2,
                    "name": "Shopify"
                },
                {
                    "id": 4,
                    "name": "Cart"
                }
            ],
            "stock_quantity": {
                "available_stock": "0.000",
                "in_stock": "0.000",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 2,
            "sku": "NY-ETSY",
            "name": "NY Print Single",
            "category": {
                "id": 2,
                "name": "Finished Products"
            },
            "tags": [
                {
                    "id": 2,
                    "name": "Shopify"
                },
                {
                    "id": 4,
                    "name": "Cart"
                },
                {
                    "id": 5,
                    "name": "Order"
                }
            ],
            "stock_quantity": {
                "available_stock": "80.000",
                "in_stock": "100.000",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 3,
            "sku": "BWAX",
            "name": "Beeswax",
            "category": {
                "id": 3,
                "name": "Raw Materials"
            },
            "tags": [
                {
                    "id": 3,
                    "name": "Xero"
                },
                {
                    "id": 4,
                    "name": "Cart"
                },
                {
                    "id": 5,
                    "name": "Order"
                },
                {
                    "id": 6,
                    "name": "Random"
                }
            ],
            "stock_quantity": {
                "available_stock": "599.425",
                "in_stock": "600.123",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 4,
            "sku": "JNGLCOT",
            "name": "Cotton - Jungle Print",
            "category": {
                "id": 3,
                "name": "Raw Materials"
            },
            "tags": [
                {
                    "id": 1,
                    "name": "Etsy"
                },
                {
                    "id": 4,
                    "name": "Cart"
                },
                {
                    "id": 5,
                    "name": "Order"
                },
                {
                    "id": 6,
                    "name": "Random"
                }
            ],
            "stock_quantity": {
                "available_stock": "10.000",
                "in_stock": "18.750",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 5,
            "sku": "OCN-S",
            "name": "Cotton - Ocean Print",
            "category": {
                "id": 3,
                "name": "Raw Materials"
            },
            "tags": [
                {
                    "id": 2,
                    "name": "Shopify"
                },
                {
                    "id": 4,
                    "name": "Cart"
                },
                {
                    "id": 6,
                    "name": "Random"
                }
            ],
            "stock_quantity": {
                "available_stock": "59.000",
                "in_stock": "186.000",
                "stock_status": "OUT_OF_STOCK"
            }
        },
        {
            "id": 8,
            "sku": "ETSY-FOREST-1",
            "name": "Etsy Bundle Pack-1",
            "category": {
                "id": 1,
                "name": "Bundles"
            },
            "tags": [
                {
                    "id": 2,
                    "name": "Shopify"
                }
            ],
            "stock_quantity": {
                "available_stock": "0.000",
                "in_stock": "0.000",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 9,
            "sku": "NY-ETSY-1",
            "name": "NY Print Single-1",
            "category": {
                "id": 2,
                "name": "Finished Products"
            },
            "tags": [
                {
                    "id": 2,
                    "name": "Shopify"
                }
            ],
            "stock_quantity": {
                "available_stock": "80.000",
                "in_stock": "100.000",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 10,
            "sku": "BWAX-1",
            "name": "Beeswax-1",
            "category": {
                "id": 3,
                "name": "Raw Materials"
            },
            "tags": [
                {
                    "id": 2,
                    "name": "Shopify"
                }
            ],
            "stock_quantity": {
                "available_stock": "599.425",
                "in_stock": "600.123",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 11,
            "sku": "JNGLCOT-1",
            "name": "Cotton - Jungle Print-1",
            "category": {
                "id": 3,
                "name": "Raw Materials"
            },
            "tags": [
                {
                    "id": 2,
                    "name": "Shopify"
                }
            ],
            "stock_quantity": {
                "available_stock": "10.000",
                "in_stock": "18.750",
                "stock_status": "IN_STOCK"
            }
        },
        {
            "id": 12,
            "sku": "OCN-S-2",
            "name": "Cotton - O2ean Print-1",
            "category": {
                "id": 3,
                "name": "Raw Materials"
            },
            "tags": [
                {
                    "id": 2,
                    "name": "Shopify"
                }
            ],
            "stock_quantity": {
                "available_stock": "59.000",
                "in_stock": "186.000",
                "stock_status": "OUT_OF_STOCK"
            }
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://inventory-manager-green.vercel.app/api/inventory/items/',{
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setInventoryItems(data.results);
                console.log(data.results)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

const columns = React.useMemo(
        () => [
            {
                Header: 'SKU',
                accessor: 'sku',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Tags',
                accessor: 'tags',
                Cell: ({ cell: { value } }) => (
                    <div>
                        {value.map(tag => (
                            <Button key={tag.id} variant="outlined" style={{ margin: '2px' }}>{tag.name}</Button>
                        ))}
                    </div>
                ),
            },
            {
                Header: 'Category',
                accessor: 'category.name',
            },
            {
                Header: 'In Stock Count',
                accessor: 'stock_quantity.in_stock',
            },
            {
                Header: 'Available Stock',
                accessor: 'stock_quantity.available_stock',
            },
        ],
        []
    );

    const [collapsed, setCollapsed] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleNewCategory = () => {
        setCollapsed(!collapsed);
    };
    // Mock data for total number of categories and items (replace with actual data)
    const totalCategories = 10;
    const totalItems = 50;

    // const items = [
    //     { sku: 'SKU001', name: 'Item 1', tags: ['tag1', 'tag2'], category: 'Category 1', inStockCount: 20, availableStock: 15 },
    //     { sku: 'SKU002', name: 'Item 2', tags: ['tag1', 'tag3'], category: 'Category 2', inStockCount: 30, availableStock: 25 },
    //     // Add more items as needed
    // ];

    return (
        <div className='d-flex flex'>
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} style={{ width: '250px', background: 'grey', color: 'black' }}>
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    <MenuItem icon={<Home />}>Home</MenuItem>
                    {/* More menu items... */}
                    <MenuItem icon={<Category />} component={<Link to="/items" />}>Items</MenuItem>
                    <MenuItem icon={<Inventory />}>Stock</MenuItem>
                    <MenuItem icon={<Build />}>Build</MenuItem>
                    <MenuItem icon={<People />}>Customers</MenuItem>
                    <MenuItem icon={<ShoppingCart />}>Sales Orders</MenuItem>
                    <MenuItem icon={<Storefront />}>Suppliers</MenuItem>
                    <MenuItem icon={<Warehouse />}>Manufacturers</MenuItem>
                    <MenuItem icon={<ViewList />}>Purchase Orders</MenuItem>
                    <MenuItem icon={<Report />}>Reports</MenuItem>
                    <MenuItem icon={<Help />}>Help!</MenuItem>
                    <MenuItem icon={<IntegrationInstructions />}>Integrations</MenuItem>
                    <MenuItem icon={<Logout />}>Logout</MenuItem>
                    <MenuItem icon={<Person />}>My Profile</MenuItem>
                </Menu>
            </Sidebar>

        
            <div class ="container">
             <div class ="row">
                    <div class="col p-2">
                        <h1>Item Dashboard</h1>
                    </div>
                    <div class="col">
                         <div class='d-flex flex-column  p-3 mx-5 float-end'>
                            <div class=''>
                                <div className='d-flex flex-row mb-3'>
                                <span><Inventory/> &nbsp;</span>
                                <h4>Total Categories: {totalCategories}</h4>
                                </div>
                                
                                <div className='d-flex flex-row'>
                                <span><Category/> &nbsp;</span>
                                <h4>Total Items: {totalItems}</h4>
                                </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div class='row mb-5'>
                        <div>
                        <Button variant="contained" onClick={handleNewCategory} startIcon={<AddCircleOutline />}>New Category</Button>
                        {/* <button className="btn btn-primary mt-3" onClick={handleNewCategory}>New Category</button> */}
                        </div>
                        
                    </div>

                        <div class='row mb-2'>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Button variant="contained" startIcon={<AddCircleOutline />}>New Item</Button>
                            <div className="d-flex align-items-center">
                              <TextField id="search" label="Search" variant="outlined" size="small" />
                                 <IconButton color="primary" aria-label="search">
                             <Search />
                        </IconButton>
                        </div>
                        <IconButton color="primary" aria-label="filter">
                            <FilterList />
                        </IconButton>
        </div>
                        </div>


                    <div class='row'>
                     <ItemTable columns={columns} items={inventoryItems} />
                    </div>
            </div>
            

        </div>
    );
}


export default Dashboard;
