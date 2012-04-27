CREATE or replace  FUNCTION union_counties() RETURNS integer AS $$
DECLARE
    quantity integer := 30;
    countyrow counties_tlc%ROWTYPE;
    manarearow manarea%ROWTYPE;
    areasum numeric;
    geom geometry;
    geom2 geometry;
    
BEGIN
    RAISE NOTICE 'Quantity here is %', quantity;  -- Quantity here is 30
    quantity := 55;
    
    select * into countyrow from counties_tlc where ogc_fid = 1;
    RAISE NOTICE 'test %', countyrow.co_name;
    
    select sum(area) into areasum from counties_tlc;
    RAISE NOTICE 'test %', areasum;
    
    select st_union(wkb_geometry) into geom from counties_tlc;
    RAISE NOTICE 'test %', st_area(geom);
    
    for manarearow in select * from manarea loop
       -- RAISE NOTICE 'test %', manarearow.acres;
        if (st_intersects(manarearow.the_geom, geom)) then
            RAISE NOTICE 'test %', manarearow.ma_name;
            
            insert into manarea_trngl(ma_id, acres, ma_name, owner, owner_type, the_geom) values
            (manarearow.ma_id, manarearow.acres, manarearow.ma_name, manarearow.owner,  manarearow.owner_type, manarearow.the_geom);
        
        
        end if;
        
        
    
    
    end loop;
    
    
   

    RAISE NOTICE 'Quantity here is %', quantity;  -- Quantity here is 50

    RETURN quantity;
END;
$$ LANGUAGE plpgsql;