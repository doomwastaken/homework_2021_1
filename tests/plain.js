'use strict';

QUnit.module('Тестируем функцию plain', function () {
	QUnit.test('Работает с единственным элементом', function (assert) {
		assert.deepEqual(plain([]), [], 'Работает с пустым массивом');
		assert.deepEqual(plain([ 42 ]), [ 42 ], 'Работает с массивом из одного элемента');
		assert.deepEqual(plain([ 1, 2, 3, 4 ]), [ 1, 2, 3, 4 ], 'Сохраняет порядок элементов');
	});

	QUnit.test('Работает с единственным массивом', function (assert) {
		assert.deepEqual(plain([ [] ]), []);
		assert.deepEqual(plain([ [ 42 ] ]), [ 42 ]);
		assert.deepEqual(plain([ [ 1, 2, 3, 4 ] ]), [ 1, 2, 3, 4 ]);
	});

	QUnit.test('Работает со смешанными значениями', function (assert) {
		assert.deepEqual(plain([ [], 42 ]), [ 42 ]);
		assert.deepEqual(plain([ [ 42 ], 0 ]), [ 42, 0 ]);
		assert.deepEqual(plain([ [ 1, 2, 3, 4 ], 5, 6, 7, 8 ]), [ 1, 2, 3, 4, 5, 6, 7, 8 ]);
	});

	QUnit.test('Работает с несколькими массивами', function (assert) {
		assert.deepEqual(plain([ [], [] ]), [], 'Работает с пустыми массивами');
		assert.deepEqual(plain([ [ 42 ], [ 42 ] ]), [ 42, 42 ]);
		assert.deepEqual(plain([ [ 42, 42 ], [ 42 ] ]), [ 42, 42, 42 ]);
		assert.deepEqual(plain([ [ 1 ], [ 2 ], [ 3 ], [ 4, 5, 6 ] ]), [ 1, 2, 3, 4, 5, 6 ]);
	});

	QUnit.test('Работает с вложенными массивами', function (assert) {
		assert.deepEqual(plain([ [], [ [], [], [] ] ]), [], 'Работает с пустыми массивами');
		assert.deepEqual(plain([ [ 42 ], [ [ 42 ], [], [ 42 ] ], [ 42 ] ]), [ 42, 42, 42, 42 ]);
		assert.deepEqual(plain([ [ 42, 42 ], [ 42, [ 42, [ 42, 42 ], 42 ] ] ]), [ 42, 42, 42, 42, 42, 42, 42 ]);
		assert.deepEqual(plain([ [ 1 ], [ 2 ], [ 3 ], [ 4, 5, [ 6, 7, 8, [ 9 ] ], 10 ], 11 ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);
	});

	QUnit.test('Работает с элементами разных типов', function (assert) {
		assert.deepEqual(plain([ [ 'abcde' ], [ [ 'f' ], [ null, false ], [ NaN, NaN ], NaN ], -Infinity ]), [ 'abcde', 'f', null, false, NaN, NaN, NaN, -Infinity ]);
    });
    
	QUnit.test('Работает с объектами', function (assert) {
		assert.deepEqual(plain([{name: 'Jordan', age:30 }]), [{name: 'Jordan', age: 30}], 'Работает с одним объектом');
		assert.deepEqual(plain([{name: 'Potter'}, {name: 'Harry'}]), [{name: 'Potter'}, {name: 'Harry'}], 'Работает с несколькими объектами');
    });
    
	QUnit.test('Работает с примитивами', function (assert) {
		assert.deepEqual(plain([true, false]),[true,false],'Работает с boolean');
		assert.deepEqual(plain(['hello', 'world']), ['hello', 'world'], 'Работает со string');
		assert.deepEqual(plain([null]),[null], 'Работает с null');
		assert.deepEqual(plain([undefined]), [undefined], 'Работает с undefined');
		assert.deepEqual(plain([Symbol.for('id')]), [Symbol.for('id')], 'Работает с symbol');
	});
	QUnit.test('Работает с некоррекным типом данных', function (assert) {
		assert.deepEqual(plain(false), [], 'boolean');
		assert.deepEqual(plain('string'), [], 'string');
		assert.deepEqual(plain(), [], 'do nothing')
		assert.deepEqual(plain(null), [], 'null');
		assert.deepEqual(plain(Symbol('xd')), [], 'symbol');
		assert.deepEqual(plain(undefined), [], 'undefined');

	})
});