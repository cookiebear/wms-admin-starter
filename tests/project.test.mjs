import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('sample data contains all WMS business entities',()=>{const s=readFileSync('src/data/seed.ts','utf8');for(const entity of ['clients','warehouses','products','inventory','inbounds','outbounds','returns'])assert.match(s,new RegExp(entity))});
test('workflow has inventory allocation and stock decrement',()=>{const s=readFileSync('src/lib/mockApi.ts','utf8');assert.match(s,/inv\.allocated\+=row\.quantity/);assert.match(s,/inv\.quantity-=row\.quantity/)});
