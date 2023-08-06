pico-8 cartridge // http://www.pico-8.com
version 33
__lua__
-- sheep.p8
--
-- both girls are shepherds.
-- the sheep are lost!
-- find them, bring them home.

function _init()
	emap={}
	for y=0,63 do
		for x=0,127 do
			local i = y*128+x
			emap[i] = {}
		end
	end
	
	numsheep=0
	
	_update = updategame
	_draw = drawgame
	
	for y=0,63 do
		for x=0,127 do
			local s = mget(x,y)
			if s==12 then
				sarah=makeplayer(x,y,1)
				replacetile(x,y)
			elseif s==13 then
				abbey=makeplayer(x,y,2)
				replacetile(x,y)
			elseif s==8 then
				makebees(x,y)
				replacetile(x,y)
			elseif s==9 then
				numsheep += 1
				makesheep(x,y)
				replacetile(x,y)
			elseif s==10 then
				makewolf(x,y)
				replacetile(x,y)
			elseif s==3 then
				makebush(x,y,nil)
				replacetile(x,y)
			elseif s==35 then
				makeseed(x,y)
				replacetile(x,y)
			elseif fget(s,2) then
				-- trees
				local seeder
				local s2 = mget(x+1,y)
				if s2==7 then
					seeder=makeapple
				elseif s2==8 then
					seeder=makebees
				elseif s2==9 then
					seeder=makesheep
					numsheep += 1
				end
				
				maketree(x,y,s,seeder)
				
				replacetile(x,y)
				replacetile(x+1,y)
				replacetile(x,y+1)
				replacetile(x+1,y+1)
			elseif s==57 then
				numsheep += 1
				makebush(x,y,makesheep)
				replacetile(x,y)
			elseif s==56 then
				makebush(x,y,makebees)
				replacetile(x,y)
			elseif fget(s,0) then
				makesolid(x,y,s)
				replacetile(x,y)
			elseif fget(s,1) then
				makedecor(x,y,s)
				replacetile(x,y)
			elseif s==32 then
				makepasture(x,y,s)
				replacetile(x,y)
			elseif s==16 then
				makepastureguard(x,y,s)
				replacetile(x,y)
			end
		end
	end
end

-- emap: 128 x 64 grid
-- each cell = ent[]
-- cx,cy = floor(px,py / 8)
-- index = cx + cy*128

function emapi(x,y)
	local cx = flr(x/8)
	local cy = flr(y/8)
	return cy*128+cx
end

function add_to_emap(e)
	e.slots = {}
	emap_move(e)
end

function emap_move(e)
	emap_remove(e)
	
	for x=0,1 do
		for y=0,1 do
			local x = e.x + e.w*x
			local y = e.y + e.h*y
			local i = emapi(x,y)
			add(emap[i], e)
			add(e.slots, emap[i])
		end
	end
end

function emap_remove(e)
	for es in all(e.slots) do
		del(es, e)
	end
	e.slots={}
end

function replacetile(x,y)
	mset(x,y,0)
end

function updategame()
	if youwon then
		if (youwon<50) youwon+=1
		return
	end
	
	for fn in all(nextticks) do
		fn()
	end
	nextticks={}
	
	-- get spot between players
	local w2 = sarah.w/2
	local h2 = sarah.h/2
	local cx=(sarah.x+abbey.x)/2+w2
	local cy=(sarah.y+abbey.y)/2+h2
	
	-- save camera pixel top-left
	camx=mid(0, cx-64,   8*128-128)
	camy=mid(0, cy-64+4, 8* 64-120)
	
	local cellx=flr(camx/8)
	local celly=flr(camy/8)
	
	-- save emap cell top-left
	emapx = mid(1,cellx,127-16)
	emapy = mid(1,celly,63 -16)
	
	local seen={}
	
	for y=emapy-1,emapy+16 do
		for x=emapx-1,emapx+16 do
			local es = emap[y*128+x]
			for e in all(es) do
				if not seen[e] then
					seen[e]=true
					
					if e.tick then
						e:tick()
					end
					
					if e.movable then
						trymoving(e)
					end
				end
			end
		end
	end
	
end

function drawgame()
	cls(3)
	
	camera(camx,camy-8)
	
	map(0,0,0,0,128,64)
	
	local drawlast={}
	
	local seen={}
	for y=emapy-1,emapy+16 do
		for x=emapx-1,emapx+16 do
			local es = emap[y*128+x]
			for e in all(es) do
				if not seen[e] then
					seen[e]=true
					
					if e.k!='player' then
						e:draw()
						if e.drawlast then
							add(drawlast,e)
						else
						end
					end
				end
			end
		end
	end
	
	sarah:draw()
	abbey:draw()
	
	for e in all(drawlast) do
		e:drawlast()
	end
	
	camera()
	
	rectfill(0,0,127,7,0)
	
	-- sheep
	print(tostr(numsheep),
	      10,2,7)
	spr(9,0,-1)
	
	if _cpu then
		print('cpu:'..tostr(stat(1)),
			30,1,7)
	end
	
	if _mem then
		print('mem:'..tostr(stat(0)),
			80,1,7)
	end
	
	if youwon then
		if time()%2<1 then
			print("you won!", 50,1,10)
		end
		
		spr(74,50,youwon,4,4)
	end
end

function round(n)
	if n % 1 < 0.5 then
		return flr(n)
	else
		return ceil(n)
	end
end


function makesolid(x,y,s)
	add_to_emap({
		k='solid',
		x=x*8,
		y=y*8,
		w=8,
		h=8,
		s=s,
		solid=true,
		draw=drawsimple,
	})
end

function makepasture(x,y,s)
	add_to_emap({
		k='pasture',
		x=x*8,
		y=y*8,
		w=8,
		h=8,
		s=s,
		draw=drawsimple,
	})
end

function makepastureguard(x,y,s)
	add_to_emap({
		k='pastureguard',
		x=x*8,
		y=y*8,
		w=8,
		h=8,
		s=s,
		draw=drawsimple,
	})
end

function makedecor(x,y,s)
	add_to_emap({
		k='decor',
		x=x*8,
		y=y*8,
		w=8,
		h=8,
		s=s,
		draw=drawsimple,
		drawlast=drawsimple,
	})
end

function drawsimple(e)
	spr(e.s, e.x, e.y)
end

--[[ flags

0 solid
1 draw in front
2 top-left-tree
3 
4 
5 
6 
7 

--]]

_playerbox=false
_hitbox=false
_hitsearch=false
_sheepbox=false
_mem=false
_cpu=false

nextticks={}
function nexttick(fn)
	add(nextticks,fn)
end

function wongame()
	_mem=false
	_cpu=false
	youwon=-32
end

-->8
-- players

function makeplayer(x,y,n)
	local offx=3
	local offy=2
	local e={
		k='player',
		x=x*8+offx,
		y=y*8+offy,
		w=2,
		h=6,
		n=n,
		speed=1,
		draw=drawplayer,
		tick=tickplayer,
		movable=true,
		collide=player_collide,
		mx=0,
		my=0,
  action=nil,
		d=1,
		offx=offx,
		offy=offy,
	}
	add_to_emap(e)
	return e
end

function drawplayer(p)
	local s = 12
	if (p.n==2) s+=1
	
	local f = false
	if (p.d < 0) f=true
	
	if p.sleep then
		s += 48
	elseif p.moving then
		if p.move_t % 10 <= 5 then
			s += 16
		end
	elseif p.action then
		s += 32
	end
	
	local x = p.x - p.offx
	local y = p.y - p.offy
	
	spr(s, x,y, 1,1, f)
	
	if p.sleep then
		local t = 30*5-p.sleep
		local n = flr(t/7)%4
		spr(14+(n*16), x,y, 1,1, f)
	end
	
	if _playerbox then
		color(1)
		rect(p.x,p.y,p.x+p.w,p.y+p.h)
	end
	
	if _hitbox then
		local r = hitrect(p)
		rect(r.x,r.y,r.x+r.w,r.y+r.h,0)
	end
	
	if p.action and
	   p.action.button==❎ then
		local r = hitrect(p)
		local s = p.n+(16*p.action.spr)
		spr(s, r.x-1,r.y-3, 1,1, f)
	end
	
	if p.has=='bees' then
		spr(22,x,y+3,1,1,f)
	elseif p.has=='apple' then
		spr(23,x,y+3,1,1,f)
	end
end

function hitrect(p)
	local x = p.x + 3
	if (p.d<0) x -= 10
	local y = p.y+3
	return {x=x,y=y,w=5,h=2}
end

function wakeup(p)
	p.sleep=nil
end

function tickplayer(p)
	p.mx=0
	p.my=0
	
	if p.sleep then
		p.sleep -= 1
		if (p.sleep==0) p.sleep=nil
		return
	end
	
	-- moving
	if (btn(⬅️,p.n-1)) p.mx=-1
	if (btn(➡️,p.n-1)) p.mx= 1
	if (btn(⬆️,p.n-1)) p.my=-1
	if (btn(⬇️,p.n-1)) p.my= 1
	
	-- animate acting spr
	if p.action then
		p.action = p.action.tick(p)
	else
		if     btnp(❎,p.n-1) then
			p.action=makeaction(p.n,❎)
		elseif btnp(🅾️,p.n-1) then
			p.action=makeaction(p.n,🅾️)
		end
	end
	
end

function makeaction(n,b)
	local act=actions[n][b]
	local done=false
	local t=3*4
	local a={button=b}
	a.spr=0
	a.tick=function(p)
		t -= 1
		if (t == 0) return nil
		
		a.spr = (3-flr(t/3))
		if not done then
			done = act(p)
		end
		return a
	end
	return a
end

function find_targets(p)
	local es={}
	
	-- for rect of acting tool:
	-- check cells at each corner
	local r=hitrect(p)
	for x=0,1 do
		for y=0,1 do
			-- get the x/y of corner
			local x1 = r.x + r.w*x
			local y1 = r.y + r.h*y
			
			-- now check this cell
			local i = emapi(x1,y1)
			for e in all(emap[i]) do
				if hitinside(e,r) then
					add(es,e)
				end
			end
		end
	end
	
	return es
end

function hitinside(e,r)
	if _hitsearch then
		camera(camx,camy)
		color(13)
		rect(e.x,e.y,e.x+e.w,e.y+e.h)
		flip()
		camera()
	end
	
	return collided(e,r)
end

function stung(e)
	e.sleep=30*5
	e.action=nil
end

function player_collide(e,e2)
	if e2.k=='bees' then
		sting(e2,e)
		return true
	elseif e2.k=='wolf' then
		bite(e2,e)
		return true
	end
end

function act_stick(p)
	for e in all(find_targets(p)) do
		if e.k=='tree' then
			hittree(e, p.d)
			return true
		elseif e.k=='bush' then
			hitbush(e)
			return true
		elseif e.k=='sheep' then
			hitsheep(e)
		end
	end
end

function act_bag(p)
	for e in all(find_targets(p)) do
		if e.k=='apple' then
			p.has='apple'
			emap_remove(e)
			return true
		elseif e.k=='bees' then
			p.has='bees'
			emap_remove(e)
			return true
		elseif e.k=='sheep' then
			hitsheep(e)
			return true
		end
	end
end

function act_throw(p)
	if (not p.has) return act_pet(p)
	
	local x=p.x/8+p.d
	local y=p.y/8
	
	local e
	if p.has=='bees' then
		e=makebees(x,y)
	elseif p.has=='apple' then
		e=makeapple(x,y)
	end
	p.has=nil
	
	e:throw(p.d)
end

function act_pet(p)
	for e in all(find_targets(p)) do
		if e.k=='sheep' then
			calmsheep(e,p)
			return true
		end
	end
end

actions = {
	-- player 1
	{[❎]=act_stick,
  [🅾️]=act_pet},
	
	-- player 2
	{[❎]=act_bag,
  [🅾️]=act_throw},
}

-->8
-- moving

function trymoving(e)
	e.moving = e.mx!=0 or e.my!=0
	
	if e.moving then
		if not e.move_t then
			e.move_t = 0
		end
		e.move_t += 1
		if e.move_t == 30 then
			e.move_t = 0
		end
	else
		e.move_t=nil
	end
	
	if e.mx != 0 then
		e.d  = e.mx
		
		e.x += e.mx * e.speed
		if trymovingdir(e, e.mx,0) then
			emap_move(e)
		else
			e.x -= e.mx * e.speed
		end
	end
	
	if e.my != 0 then
		e.y += e.my * e.speed
		if trymovingdir(e, 0,e.my) then
			emap_move(e)
		else
			e.y -= e.my * e.speed
		end
	end
end

function trymovingdir(e,x,y)
	
	-- keep them both on screen
	if e.k=='player' then
		local e1,e2 = sarah,abbey
		local dx = abs(e1.x-e2.x)
		local dy = abs(e1.y-e2.y)
		if dx > 128-e1.w or
		   dy > 120-e1.h then
			return false
		end
	end
	
 -- get relative points
 -- top-l,   bottom-l, or
 -- right-t, right-b,  etc
	local rx1,rx2=x,x
	local ry1,ry2=y,y
	if x==0 then
		rx1=-1 rx2=1
	elseif y==0 then
		ry1=-1 ry2=1
	end
	
	-- get center of entity
	local w2 = e.w/2
	local h2 = e.h/2
	local cx = e.x + w2
	local cy = e.y + h2
	
	-- get both absolute points
	local x1 = cx + w2*rx1
	local x2 = cx + w2*rx2
	local y1 = cy + h2*ry1
	local y2 = cy + h2*ry2
	
	-- get emap indexes
	local ei1=emapi(x1,y1)
	local ei2=emapi(x2,y2)
	
	-- get entity arrays in emap
	local ea1 = emap[ei1]
	local ea2 = emap[ei2]
	
	-- combine into one array
	local eas = {ea1}
	if (ei1 != ei2) add(eas,ea2)
	
	local seen={}
	-- loop through each array
	for ea in all(eas) do
		-- loop through each entity
		for e2 in all(ea) do
			if not seen[e2] then
				seen[e2]=true
				if collided(e,e2) then
					if e2.solid then
						return false
					else
						e:collide(e2)
					end
				end
			end
		end
	end
	
	return true
end

function collided(e1,e2)
 -- can't collide with yourself
	if (e1==e2) return false
	
 -- get their distance apart
	local dx = abs(e1.x-e2.x)
	local dy = abs(e1.y-e2.y)
	
	-- if they're >10 px apart
	-- they can't be colliding!!
	if dx>10 or dy>10 then
		return false
	end
	
	-- if the diff between x1,x2
	-- is less than first's width
	-- and same for height
	-- then they collided
	
	local w = e1.x < e2.x
	          and e1.w or e2.w
	
	local h = e1.y < e2.y
	          and e1.h or e2.h
	
	return dx < w and dy < h
end

-->8
-- sheep

sheep_speed=0.2

function makesheep(x,y,d)
	local offx=1
	local offy=3
	local e={
		k='sheep',
		x=x*8+offx,
		y=y*8+offy,
		w=5,
		h=5,
		offx=offx,
		offy=offy,
		t=d and 30 or 0,
		speed=sheep_speed,
		movable=true,
		draw=drawsheep,
		tick=ticksheep,
		toss=tosssheep,
		collide=sheep_collided,
		mx=d or 0,
		my=0,
		d=1,
	}
	add_to_emap(e)
	return e
end

function drawsheep(e)
	local s = 9
	if e.moving then
		if e.move_t % 10 <= 5 then
			s += 16
		end
	end
	
	local f = false
	if (e.d < 0) f=true
	
	local x=e.x-e.offx
	local y=e.y-e.offy
	
	spr(s, x,y, 1,1, f)
	
	if _sheepbox then
		color(2)
		rect(e.x,e.y,e.x+e.w,e.y+e.h)
	end
	
	if e.hearts then
		e.hearts.draw()
	end
	
	if e.friend then
		local p=e.friend
		line(
			p.x+p.w/2+p.d*p.w,
			p.y+3,
			e.x+e.w/2+e.d,
			e.y,
			4
		)
	end
end

function tosssheep(e,d)
	e.t=30*3
	e.mx=d
	e.my=1
end

function feedsheep(e)
	e.hearts=animator(e,15,4,0,7)
	e.pet=true
end

function ticksheep(e)
	if e.hearts then
		e.hearts=e.hearts.tick()
	end
	
	if e.fellow then
		if abs(e.fellow.x-e.x)>50
		or abs(e.fellow.y-e.y)>50
		then
			e.fellow=nil
		end
	end
	
	-- choose new action when idle
	if e.t == 0 then
		
		-- run from wolves
		local w=findrad(e,2,{'wolf'})
		if w then
			local dx=w.x-e.x
			local dy=w.y-e.y
			local adx=abs(dx)
			local ady=abs(dy)
			if (adx>5) e.mx = -sgn(dx)
			if (ady>5) e.my = -sgn(dy)
			e.t = 30
			return
		end
		
		-- follow friend
		if e.friend then
			local dx=e.friend.x-e.x
			local dy=e.friend.y-e.y
			local adx,ady=abs(dx),abs(dy)
			e.mx,e.my=0,0
			
			if adx>50 or ady>50 then
				e.friend=nil
				return
			end
			
			if (adx>10) e.mx=sgn(dx)
			if (ady>10) e.my=sgn(dy)
			return
		end
		
		-- find owner
		if e.pet and not e.friend then
			e.friend=findrad(e,2,{'player'})
		end
		
		-- follow sheep
		local e2=findrad(e,2,{'sheep'})
	 if e2 then
	 	local dx=e2.x-e.x
	 	local dy=e2.y-e.y
	 	e.fellow = e2
	 end
		
		-- otherwise choose action
		local still=rnd()<0.5
		
		e.speed = sheep_speed
		if still then
			-- stand still for 2-3 sec
			e.t = flr((rnd(1)+2)*30)
			e.mx = 0
			e.my = 0
		else
			-- maybe follow
			if e.fellow then
				local follow=rnd()<0.67
				if follow then
					-- follow for 1 sec
					local f = e.fellow
					local dx=f.x-e.x
					local dy=f.y-e.y
					local adx=abs(dx)
					local ady=abs(dy)
					if (adx>2) e.mx = sgn(dx)
					if (ady>2) e.my = sgn(dy)
					e.t = 30
					return
				end
			end
			
			-- walk for 1 sec
			e.t = 30
			e.mx = round(rnd(2))-1
			e.my = round(rnd(2))-1
		end
	else
		e.t -= 1
	end
end

function hitsheep(e,d)
	e.t = 60
	e.speed=sheep_speed*3
	e.friend=nil -- hes like >:(
	e.pet=nil
	e.mx, e.my = randommoves()
end

function calmsheep(e,p)
	if (not e.calming) e.calming=0
	e.calming += 1
	
	if e.calming==3 then
		e.mx=0
		e.my=0
	end
	
	if e.calming==5 then
		e.speed = sheep_speed
		e.friend=p
		e.calming=nil
		e.hearts=animator(e,15,4,0,7)
	end
end

function animator(e,s,fs,ox,oy)
	local top=fs*4
	local t=0
	a={
		draw=function()
			local ss=flr(t/fs)*16
			spr(s+ss,e.x-ox,e.y-oy)
		end,
		tick=function()
			t+=1
			if (t==top) a=nil
			return a
		end,
	}
	return a
end

function randommoves()
	local a,b
	a = rnd()<0.5 and 1 or -1
	b = rnd()<0.5 and 1 or -1
	if (rnd()<0.5) b=0
	if (rnd()<0.5) a,b = b,a
	return a,b
end

function sheep_collided(e,e2)
	if e2.k == 'pasture' then
		e.k='homesheep'
		e.tick=tick_homesheep
		e.draw=draw_homesheep
		e.collide=homesheep_collide
		e.pet=nil
		e.friend=nil
		e.t=0
		e.mt=0
		e.mx=0
		e.my=0
		e.hearts=nil
		e.speed = sheep_speed
		
		numsheep -= 1
		if numsheep==0 then
			wongame()
		end
	elseif e2.k == 'bees' then
		hitsheep(e)
	end
end

function homesheep_collide(e)
	-- they're fine.
	-- they're home now.
end

function tick_homesheep(e)
	-- choose new action when idle
	if e.t == 0 then
		local still=rnd()<0.5
		if still then
			-- stand still for 2-3 sec
			e.mt=flr((rnd(1)+2)*30)
			e.t = e.mt
			e.mx = 0
			e.my = 0
		else
			-- walk for 1 sec
			e.mt = 30
			e.t = e.mt
			local e2=findrad(e,2,
			 {'pasture'})
			
			e.mx,e.my=0,0
			if e2 then
				e.mx=sgn(e2.x-e.x)
				e.my=sgn(e2.y-e.y)
			end
		end
	else
		e.t -= 1
	end
end

function draw_homesheep(e)
	drawsheep(e)
	
	local n=flr((e.mt-(e.t/8))%4)
	local s=15+(n*16)
	
	spr(s,e.x,e.y-7)
end

-->8
-- bees

beespeed=0.3

function makebees(x,y)
	local e={
		k='bees',
		x=x*8,
		y=y*8,
		w=6,
		h=6,
		offx=1,
		offy=1,
		t=0,
		movable=true,
		mx=0,
		my=0,
		speed=beespeed,
		animt=0,
		collide=bees_collide,
		draw=drawbees,
		tick=tickbees,
		toss=tossbees,
		throw=throwbees,
	}
	add_to_emap(e)
	return e
end

function throwbees(e,d)
	e.t=30*2
	e.speed=beespeed*3
	e.mx=d
	e.my=0
	e.flee=true
end

function tossbees(e, d)
	-- they just sort of come out
	-- and hover around i guess
end

function drawbees(e)
	local s=8
	s += (flr(e.animt/5)%3) * 16
	spr(s, e.x-e.offx, e.y-e.offy)
end

function tickbees(e)
	e.animt += 1
	if (e.animt==30) e.animt=0
	
	if e.t > 0 then
		e.t-=1
		if e.t==0 then
			e.chase=nil
			e.flee=nil
			e.mx=0
			e.my=0
			e.speed=beespeed
		end
	end
	
	if e.chase then
		if e.t > 30 then
			e.mx = sgn(e.chase.x-e.x)
			e.my = sgn(e.chase.y-e.y)
		else
			e.mx=0
			e.my=0
		end
	elseif not e.flee then
		trystinging(e)
	end
	
end

function bees_collide(e,e2)
	if e2.k == 'sheep' then
		hitsheep(e2)
	elseif e2.k=='player' then
		if not e.flee then
			sting(e,e2)
		end
	elseif e2.k=='wolf' then
		stingwolf(e,e2)
	end
end

function sting(e,e2)
	e.chase=nil
	e.flee=true
	e.mx, e.my = randommoves()
	e.t=30*5
	
	stung(e2)
end

function stingwolf(e,e2)
	local mx,my=randommoves()
	danceoffstage(e,mx,my)
	danceoffstage(e2,mx,my)
end

function danceoffstage(e,mx,my)
	e.movable=true
	e.mx=mx
	e.my=my
	e.speed=1
	local t=60
	e.collide=function()end
	e.tick=function()
		t-=1
		if t==0 then
			nexttick(function()
				emap_remove(e)
			end)
		end
	end
end

function trystinging(e)
	local e2 = findrad(e,2,
	 {'player','wolf'})
	
	if e2 then
		if e2.k=='player' then
			e.t=60
			e.chase=e2
		end
	end
end

function findrad(e,radius,ks)
	-- todo: uhh, this is a square
	--        not a circle.
	--
	--       we need to compare
	--        distance using:
	--
	--       some math stuff.
	--       ... or something.
	
	local found={}
	
	for x=-radius,radius do
		for y=-radius,radius do
			
			local x1=e.x+e.w/2+x*8
			local y1=e.y+e.h/2+y*8
			local i=emapi(x1,y1)
			
			for e2 in all(emap[i]) do
				if e != e2 then
					if count(ks, e2.k) > 0 then
						add(found,e2)
					end
				end
			end
			
		end
	end
	
	return rnd(found)
end

-->8
-- vegetation

function makebush(x,y,seeder)
	add_to_emap({
		k='bush',
		x=x*8,
		y=y*8,
		w=8,
		h=8,
		t=0,
		solid=true,
		draw=drawbush,
		tick=tickbush,
		seeder=seeder,
		shaker=seeder and makeshaker()
	})
end

function makeseed(x,y)
	add_to_emap({
		k='seed',
		x=x*8,
		y=y*8,
		w=8,
		h=8,
		t=30*20,
		draw=drawseed,
		tick=tickseed,
	})
end

function makeshaker()
	local t=0
	return {
		tick=function()
			if t == 0 then
				t = ceil(rnd(5)+5)*30
			else
				t -= 1
			end
		end,
		shake=function()
		 -- shake every 5-10 sec
			return t < 20 and t%8 < 4
		end,
	}
end

function tickbush(e)
	if e.dying then
		e.dying -= 1
		if e.dying==0 then
			e.dying = nil
		end
	elseif e.shaker then
		e.shaker.tick()
	end
end

function drawbush(e)
	local s=3
	if e.dying then
		s+=32
	elseif e.shaker then
		if (e.shaker.shake()) s+=16
	end
	spr(s,e.x,e.y)
end

function hitbush(e)
	if e.dying then
		local x=e.x/8
		local y=e.y/8
		
		emap_remove(e)
		makeseed(x, y)
		if e.seeder then
			e.seeder(x, y)
		end
	else
		e.dying = 30*5
	end
end

function drawseed(e)
	spr(51,e.x,e.y)
end

function tickseed(e)
	e.t -= 1
	if e.t == 0 then
		-- todo:
		-- only seed if player
		-- is not in radius.
		-- this will give us
		-- radius checking code
		-- which will help
		-- with sheep and wolves too
		-- (and maybe bees.)
		-- (maybe they chase you.)
		-- (who knows.)
		
		emap_remove(e)
		local x = e.x/8
		local y = e.y/8
		makebush(x,y)
	end
end

function maketree(x,y,s,itemfn)
	local offx=6
	add_to_emap({
		k='tree',
		x=x*8+offx,
		y=y*8+8,
		w=3,
		h=8,
		offx=offx,
		solid=true,
		itemfn=itemfn,
		s=s,
		tick=ticktree,
		draw=drawtree,
		drawlast=drawtreelast,
		shaker=itemfn and makeshaker(),
	})
end

function drawtreelast(e)
	local hit = e.hitted or 0
	local x=e.x-e.offx + hit
	if e.shaker then
		if (e.shaker.shake()) x+=1
	end
	spr(e.s,x,e.y-8,2,1)
end

function drawtree(e)
	local hit = e.hitted or 0
	local x=e.x-e.offx + hit
	if e.shaker then
		if (e.shaker.shake()) x+=1
	end
	spr(e.s+16,x,e.y,2,1)
end

function ticktree(e)
	if (e.hitted) e.hitted=nil
	if (e.shaker) e.shaker.tick()
end

function hittree(e, d)
	e.hitted=d
	
	if e.itemfn then
		local x=e.x/8
		local y=e.y/8-1
		local item = e.itemfn(x,y,d)
		e.itemfn=nil
		e.shaker=nil
		
		item:toss(d)
	end
end

function makeapple(x,y)
	local e={
		k='apple',
		x=x*8,
		y=y*8,
		w=8,
		h=8,
		draw=drawapple,
		toss=tossapple,
		throw=throwapple,
	}
	add_to_emap(e)
	return e
end

function throwapple(e,d)
	e.tick = thrownapple
	e.mx = d
	e.my = 0
	e.t = 30
	e.speed = 1
	e.movable = true
	e.collide=apple_collide
end

function apple_collide(e,e2)
	if e2.k=='player' and
	   e2.sleep
	then
		wakeup(e2)
		nexttick(function()
			emap_remove(e)
		end)
		return true
	elseif e2.k=='sheep' then
		feedsheep(e2)
		nexttick(function()
			emap_remove(e)
		end)
		return true
	elseif e2.k=='wolf' then
		feedwolf(e2,e)
		nexttick(function()
			emap_remove(e)
		end)
	end
end

function thrownapple(e)
	e.t-=1
	if e.t==0 then
		e.tick=nil
		e.t=nil
		e.movable=false
	end
end

function tossapple(e,d)
	e.tick = tossedapple
	e.d    = -d
	e.vy   = rnd(.5)+2.5
	e.t    = flr(rnd(5))+10
end

function drawapple(e)
	spr(7,e.x,e.y)
end

function tossedapple(e)
	if e.t then
		e.t -= 1
		if e.t == 0 then
			emap_move(e)
		elseif e.t > 0 then
			e.y -= e.vy
			e.vy -= 0.7
			
			e.x -= e.d
		elseif e.t == -(30*20) then
			emap_remove(e)
		end
	end
end

-->8
-- wolves

function makewolf(x,y)
	local offx=2
	local offy=4
	local e={
		k='wolf',
		x=x*8+offx,
		y=y*8+offy,
		w=3,
		h=4,
		offx=offx,
		offy=offy,
		t=0,
		d=-1,
		movable=true,
		mx=0,
		my=0,
		speed=0.3,
		collide=wolf_collide,
		draw=drawwolf,
		tick=tickwolf,
	}
	add_to_emap(e)
	return e
end

function drawwolf(e)
	local s=10
	
	local f = false
	if (e.d < 0) f=true
	
	if e.moving then
		if e.move_t % 10 <= 5 then
			s += 16
		else
			s += 32
		end
	end
	
	local x=e.x-e.offx
	local y=e.y-e.offy
	
	spr(s,x,y,1,1,f)
end

function wolf_collide(e,e2)
	if e2.k=='bees' then
		stingwolf(e2,e)
	elseif e2.k=='sheep' then
		hitsheep(e2,e.d)
	elseif e2.k=='player' then
		bite(e,e2)
	end
end

function tickwolf(e)
	if e.t==0 then
		wolf_decide(e)
	else
		e.t-=1
	end
end

function bite(e,e2)
	sting(e,e2)
	-- technically it works
end

function wolf_decide(e)
	local still=rnd()<.90
	if still then
		e.t=30
		e.mx=0
		e.my=0
	else
		e.t=30
		e.mx,e.my=randommoves()
	end
end

function feedwolf(e)
	e.movable=false
	e.eating=true
	
	-- to stop collides/searches
	e.k='calmwolf'
	
	local t=0
	e.tick=function()
		t+=1
		if (t==30) t=0
	end
	e.draw=function()
		local s=10
		if (t%10<5) s+=48
		
		local f = false
		if (e.d < 0) f=true
		
		local x=e.x-e.offx
		local y=e.y-e.offy
		
		spr(s,x,y,1,1,f)
		spr(23,x,y+6,1,1,not f)
	end
end

__gfx__
000000000000055000044400000000000665000044444444450450450000bb000000000000000000000000000000000000000000000000000000000000000000
00000000005544400045554000b4b400065510005555555545045045000bb00000090a0000000000000001000000000000044400000888000000000000000000
0070070005440000004555400bbbbbb06551166000004500445450450000b000000000900000066000000120000000000044f1000088f1000000000000000000
0007700000000000044554000b4b4bb5051106514444444404545004000888000a0a0000006665100000011100000000004fff00008fff000000000000000000
0007700000000000004440000b4bbb45006660115455545504504504008ee88000000000006665500001111700000000004ee000008990000001100000000000
0070070000000000000000000bb4b450066551000450045004504504008e888000900000006666000011150000000000000ee00000099000000000000000e000
00000000000000000000000000b44550065511000450004504504545008888800000009000500500101150000000000000011000000220000000000000000000
00000000000000000000000000444500000110000045004504504545000888000a00a00000500500111110000000000000011000000220000000000000000000
000000b5000000000000000000000000006666000000000000000000b000000000000a0000000000000000000000000000000000000000000000000000000000
00000bb50000000000044400004b4b0006666550000000009a000000ee0000000090000000000000000001000000000000044400000888000000000000000000
00000b5000555400004555400bbbbbb00665555100000000a9000000e8000000000000090000066000000120000000000044f1000088f1000000010000000000
000000000544000004555540bbb4b4506665555100000000000000000000000000a00000006665101000011100000000004fff00008fff000000100000000000
0b5000000000000000455540b4bbb450665555510000000000000000000000000000900000666550111111170000000000eee000009990000000000000e88000
0bb5000000000000000444000b4b4550665555110000000000000000000000000000000a006666000151150000000000000eee00000999000000000000080000
00b5000000000000000000000bb44500055551110000000000000000000000000900000000500500155150000000000000111000002220000000000000000000
0000000000000000000000000044550000111110000000000000000000000000000a090005005000100500000000000000000100000002000000000000000000
000000000000000000000000000000000000000bbbb0000000000000b0000000000000a000000000000010000000000000000000000000000000000000000000
00000000000000000000000000000000000bbbbbbbbbbb00000b0bbbbbbb00000000000000000000000012000000000000044400000888000000001000000000
00000b5000000000004440000000000000bbbbbbbbbbbbb0000bbaabbaa000000a0000000000000000001110000000000044f1000088f10000000110000e8800
000000000055500004555400000b4000bbbbbbbbbbbbbbbb00bbbababbbbb00000090a00000006601001117000000000004fff00008fff000000000000088800
000000000004450004555400004bbb00bbbbb44bb40b40bb0bbbbbbbbabb000000000000006665100101510000000000004ee000008990000000000000008000
00000000000004400045540000b4b450bbb40004040040400bbaabbabbabbb000a000000006665500115550000000000000eee00000999000000000000000000
00b50000000000000004400000b44550bbb044044404440000bbbbbbbbbbb0000000900000666600110000500000000000011000000220000000000000000000
0000000000000000000000000044450000440444444400000bbbabaababbb0000000000a05505500000000000000000000011000000220000000000000000000
00000000000000000000000000000000000000445500000000baabbabbbab000bbbbbbbbbbbbbbbb000000000000000000000000000000000000001100808000
00eee00000000000000000000000000000000044500000000bbbbbbbbbbb0000bbb9babbbbbbbbbb000000000000000000000000000000000000011008e88800
00e88e0000000000000000000000000000000044500000000bbbbb4b40bb0000bbbbbb9bbbbbb66b000000000000000000000000000000000000000000888000
00e8ee000000000004440000000000000000004450000000000bb044500b0000babbbbbbbb66651b000000000000000000000000000000000000000000080000
000ee00004500000045540000000000000000044500000000000004450000000bbbbabbbbb66655b000111110000000000000000000000000000000000000000
000bb50000450000045540000000000000000044500000000000004450000000bb9bbbbbbb6666bb001115200000000004ff000008ff00000000000000000000
00bb50000004500004554000000bb00000000044550000000000004455000000bbbbbb9bbb5bb5bb101157100000000004ffee1108ff99220000000000000000
000b500000000000004400000044550000000444450000000000044445000000babbabbbbb5bb5bb111110000000000004444e11088889220000000000000000
55555555555555555550000055555555555555555555555055555555555555555555555555000000000000000004444444440000000000000000000000000000
54444444444444444450000054444444444444444444445054444444444444444444444445000000000000000444444444444400000000000000000000000000
54141411141114111450000054111414141114111411145054111411141114111411141115000000000000044444444444444444000000000000000000000000
54111414141114114450000054141414144144141414445054114414141414114414444145000000000000444444555555555444400000000000000000000000
54141414141414144450000054114414144144141441145054144414141144144441144145000000000004444455557777555774440000000000000000000000
54141411141414111450000054141411141114141411145054144411141414111411144145000000000044445555555577ff7755444000000000000000000000
54444444444444444450000054444444444444444444445054444444444444444444444445000000000447775557755555ff5555544400000000000000000000
5555555555555555555000005555555555555555555555505555555555555555555555555500000000444577ff77755555555555544440000000000000000000
0005500000000055000000000005500000000000005500000005500000000000000005500000000004445555ff75555555555555554444000000000000000000
00055000000000550000000000055000000000000055000000055000000000000000055000000000044555555555555555555555555444000000000000000000
00055000000000550000000000055000000000000055000000055000000000000000055000000000045555555555555555555555555544400000000000000000
0005500000000055000000000005500000000000005500000005500000000000000005500000000044555555555555aaaa555555555544400000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000445555aaa5555a5555a55555555554400000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000000044555a555a555a55555a5555555554440000000000000000
000000000000000000000000000000000000000000000000000000000000000000000000000000004455a55555a5a55cc55a5555555555440000000000000000
000000000000000000000000000000000000000000000000000000000000000000000000000000004555a55445a5a55cf5a55555555555440000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000000011155a54f5a55a5cc5c55555555555440000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000111115a99a9555ccccc5aaaaa11111100000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000000011111119999111cccc1aa111aa1111100000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000000011111119991111ccc11a11111a1111100000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000111111199111cccc111a1ff11a1111100000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000111111444111cccc111422241a1111100000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000111144444111111111422244a11111000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000111144441111111111444444111111000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111144441111111000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111111111110000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000001111111111111111111111111100000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111110000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111111111111100000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111000000000000000000000000000000
41404040000000000000000000000000637300000000000000000000000000000000000000000000000000000000000000000000000101010102020202020202
02030202020302020101010004142400000000000000000000006373000000000000000000000000000000000000000000000000000000000000000000000041
41404040000000000000000000000000000000000000000000000000000000000000000000000000000000009090900000000000600101010102020202030202
02030202020202020101600005150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041
41404040000000000000000000000000000000000000000000000000000000000000000000000000000000009090909000000000600101010102020202020202
02020202020102020101600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041
41404040000000000000000064748494000000000000000000000000000000000000000000000000000000009090009090000000505001010101020302020202
02020202010102010150500000000000000000000000000000000000000000000000000000425200000000000000000000000000000000000000000000000041
41414000000000000000000065758595000000000000000000000000000000000000000000000000000000009000009090000000006001010101010303020202
02030301010201010160000000000000000000000000000000000000000000000000000000435300000000000000000000000000000000000000000000000040
41414000000062720000000000000000000000000000000000000000000000000000000000000000000000009090900090000000005050010101010102020202
02010101010101015050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040
41414000000063730000000000000000000000000000000000000000000000000000000000000000000000000090900090000000000050500101010101010101
01010101010101505000000062720000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040
41414000000000000000000000000000000000000000000000425200000000000000000000000000000000000000909090000000000000600101010101010101
01010101015050500000000063730000000042700000000000000000000000000000000000000000000000000000000000000000000000000000000000004140
41414000000000000000000000000042900000000000000000435300000000000000000000000000000000000000000000000000000000505050505001010101
50505050505050000000000000000000000043530000000000000000000000000000000000000000000000000000000000000000427000000000000000004040
41414000000000000042700000000043530000000000425200000000000000000000000000425200000000000000000000000000000000000000505050000100
00505050500000000000000000000000000000000000000000000000000000000000000000000000000000000000004280000000435300000042700000004041
41404000000000000043530000000000000000000000435300000000000000000000000000435300000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004353000000000000000043530000004041
41404000000000425200008000000000900000627200000000429000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000042700000000000000000000000000000000000004041
41404000800000435300006272000000000000637300000000435300000000000000000000000000000000000000627200000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000043530000000000000030303000303000000000004041
41404000000000000042526373425200008000000000009000000000000000000000000000000000000000000000637300000000000000000000000000000000
00000000000000000000000000009000000000000000004270000000000000000000000000000000000000000000000000303000000000003030300000004041
41404000004252000043530000435300000000427000000000008000000000006474849400000000000000000000000000000000000000000000000000000000
00000000000000000000000000900000000000000000004353000000000000000000000000000000000000000000000030300000003030303000000000004141
41400000004353627200900000006272425200435362720000000000000000006575859500000000000000000000000000000000000000000000000000000000
00000000000062700000009090909090000042700000000000000000000000000000000000000000428000000000003000000000300000000030300000004141
41400000800000637300000000006373435300000063730000425200000000000000000000000000000000000000000000000000000000004252000000000000
00000000000063730000909090900090000043530000000000000000000000000000000000000000435300000000300000003030000000000000000000000041
404000006290000080004252628000000000a0006270000000435300000000000000000000000000000000000000000000000000000000004353000000000000
00006272000000000090009000009090000000000000000000000000000000000000000000000000000000000030000000303000000000303030303000004141
40400000637300000000435363730000000000006373425200000000000000000000000000000000000000000000000000000000000000000000000000000000
0000637300000000009000909090909000000000000000000000000000000000000000000000000000000000003000003030000000a000000000000000004041
40400000000000429000000000004270006272000000435362720000000000000000000000000000000000000000000000000000000000000000000000000000
000000000062700000000090909000000000006270000000000000000000627200000000000042800000000030300030300000a000a000000000000000004040
40000000800000435300627000004353006373000000000063730000000062720000000000000000000000000000000000000000000000000000000000000000
000000000063730000000090900000000000006373000000000000000000637300000000000043530000000030000030000000a000a000000000000000004040
41000000000000004252637300000000000080004270000062720000000063730000000000000000000042520000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000303000000000000000000000000000004040
41008000004280004353000042900000425200004353000063730000000000000000000000000000000043530000000000000000000000006272000000000000
000000000000000000000000006270000000000000000000000000000000000000000000000000000000003000003030000000a0000000000090000000004041
41400000004353000000627243530000435300000000006290000000000000000000000000000000000000000000000000000000000000006373000000000000
0000000000000042520000000063730000006272000000000000000000000000000000000042700000000030003000300000a000000000000000900000004040
41400000000000000000637300000042526272000000006373000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000435300000000000000000063730000000000000000000000000000000000435300000000000030003000000000000000000090000000004040
40400000628000806270000000900043536373004280000000000042900000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030003000000000000000909000000000004040
40404000637300006373004252000000000000004353000042520043530000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000300000303000000000000090909000000000404040
41404000000000000000004353000000000000000000000043530000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000004252000000000000000000000000000000000000000000300000000030000000000090900000000000404040
41404040000000000000000000404040404000000000000000000000000000000000000040404040404040400000000000000000000000000000000000000000
00000000000000000000000000000000000000004353000000000000000000000000000040404040400000000000000030000000009090000000000040404041
41404040404040000000004040404040404040404040400000000000000000000040404040404040404040404040004040400000000000000000000000000000
00404040404040404040404040000000000000000000000000000000000000000000404040404040404000000000000000000000000000000000004040404041
41414040404040404040404040404040404141414040404040404040404040404040404040404040404040404040404040404040404000404040404000404040
40404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040400000000000404040404040404040404141
41414141414141414141414141414141414141414141414141414141414141414141414141414140414141414141414141414141414141414141414040414141
41414141414141414141414141414140404141414141414141414141414140414141414141414141414140414141404040404040404040404040414141414141
__gff__
0000000001010100000000000000000000000000010000000000000000000000000000000400040000000000000000000000000000000000000000000000000002020202020202020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
__map__
1414141414141404041414040404141414141414040404040404040404041414141414141414140404141414141414141414141414141414141414141414141414141414140404141404141414141414141414140404040404040414141414141414141414141414141414141414141414141414141414141414141414141414
1414140404040404040404040004040404040404040404040404000000000000000000000000000404040404040404040414141404040400000000000000000000000000000004040404041414040404040404040400000014141400000004040404040404040404040404040404040404040404040404040404141414141414
1414040404040000000000000000040404040400000000000000000000000000000000000000000000040404040404040404040400000000000000000000000000000000000000000404040404000000000000000000000000000000000000000000040404040404040404040404040000000000000004040404040414141414
1404040404000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004040404040400000000000000000000000000000004040404041414
0404040400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404041414
1404040000000000000000000000000000000404041400000000000000000000000000000000000000000000000000000000000000000000002627000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000404041414
1404040000000000000000000000000404040014140000000000000000000026270000000000000000000000000000000000000000000000003637000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004040414
1404000000000000000000000000040000000014140000000000040000000036370000000000000000000000000000000000000000000000000000000000000024250000000000000000000000000000000000000000000000000000000000000000000000000000242500000000000000000000000000000000000004040404
14040000000000000000000009000000000000001414140000000400000000000000000000000000000000000000000000000000000000000000000000000000343500000000000000000000000000000000000000000000000024250000000000000000000000003435000000000a0000000000000000000000000000040404
1404000000000008090000000000000000090000000000000009000400000000004344450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000003435000000000000000000000000000000000000000000000000000000000000000000000404
140400000000000400000a000400000000000008002425000000000000000800005354550000262700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000404
1404000000000400000000000004040000000000003435000000000000000000000000000000363700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004
140400000000040000140000040000000004040000000000000000040400000009000000000000000000000000000000000000000000000000000000000000000000000000000000000000002425000000000000000009000000000000000000000000000000000000000a000000000000000000000000000000000000000004
0400000000000000141414040000000000000004040000000004040004140000000000000000000000000000000000000000242500000000000000000000000000000000262700000000000034350000000000000000000000000000000000000000000000000000000000000000000000000000002627000000000000000004
04000000000400000404000014000404000900000004000900000004140000000000000000000000000000000000000000003435000000000000000000000000000000003637000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000003637000a00000000000014
0400000000000000000000000000040004000000000a00000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303030303030000000000000000000000000000000000000014
0400000008000000000000000000040414041414000000000000000400000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003030303030303030303030000000000000000000000000000000014
0400000000000000000000262700000400000400000000000004040400040404000000000000000000000000000000000000090900000000000000000000000000000000000000000000000000000000000000000000000000000000000026270000000303030003030339030303030300000000000000000000000000000014
0400000000000000000000363700000004040400000000040400040400000000000000000000000000000000000000000009090900000000000000000000000000000000000000000000000000000000000000000000000000000000000036370000000303003803030303030303030300000000000000000000000000000014
0400000000001400140000000000000000040004000000000000140000140000000000000000000000000000000000000900000900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303030303030303030303030303000000000000000000000000000004
04000000000400040000000000090000000000000004000000141400040000000000000000000000000000000000000009000900000000000000000505000000050500000000000000000000000000260900000000000000000000000000000000000303030303030903032609030303030000000a0000000000000000000404
0400000000000000000009000000000004000004040000000000040000000000000000000000000000000000000000000000000000000000000505051010101005050505000000000000000000000036370000000000000a00000000000000000000000303030303030303363703030303000000000000000000000000000414
0400000000000000000000000000140000040404000000000000000000000000242500000000000000000000000000000000000000000005050510101010101010101010050505000000000000000009000000000000000000000000000000000000000000030303030303030303030303000000000000000000000000000414
1400000000000000000000001414000404041414000009000000080000000000343500000000000000000000000000000000000000000505101010101020202020101010101005050000000024080000000000000000000000000000000000000000000000000003030303030303030300000000000000000000000000000414
0400000000000000242500000000000004040404000000000000000000000000000000000000000000000000000000000000000000000610101030202020202030202010101005050500000034350000000000000000242500000000000000000000000000000003030303030303030000000000000000000000000000000414
0404000000000000343500000000000000000000000000004344450000000000000000000000000000000000000000000000000000050510101020202020202020202020101010050505000000000000260700000000343500000000000000000000000000000000030303000303000000000000000000000000000000040414
1404000000000000000000000000000000040000000000005354550000000000000000000000000000000000000000000000000000061010102020202020303020202020201010100505000000000000363700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000414
1404000000000000000000000000000000000000000000000000000000000000000000000000000000262700000000000000000000061010303020202020202020202020202010101006000000000000000009000000000000000000000000000000000000000000000000000000000000000000000000000000000000000404
1404000000000000000000000800000000000000000000000000000000000000000000000000000000363700000000000000000000061010202020202020202020202030302020101005050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000404
1404040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005051010202020302020202020202020202020201010060000000000000000000000000000000000000000000000000000000000000000000000000000000000002425000000000000000404
140404000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000610101020202020202020202020202020202020101006000c000000000000000000000000000000000000000000000000000000000000000000000000000000003435000000000000000414
1404040000000000000000000000000026270000000000000000000000000000000000000000000000000000000000000000000000101010302020202020202020202020203020201010000000000d00000000000000000000002627000000000000000000000000000000000000000000000000000000000000000000000014
